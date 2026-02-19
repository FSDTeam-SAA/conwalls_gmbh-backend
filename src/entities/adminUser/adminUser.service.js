// src/entities/adminUser/adminUser.service.js
import RoleType from '../../lib/types.js';
import User from '../auth/auth.model.js';
import sendEmail from '../../lib/sendEmail.js';

const ALLOWED_CREATE_ROLES = [RoleType.TRAINER, RoleType.PARTICIPANT];

const buildCredentialEmailHtml = ({ name, email, password, role }) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>Account Created</h2>
      <p>Hello ${name || 'User'},</p>
      <p>An account has been created for you with the following credentials:</p>

      <div style="background:#f4f4f4;padding:12px;border-radius:8px;">
        <p><b>Email:</b> ${email}</p>
        <p><b>Password:</b> ${password}</p>
        <p><b>Role:</b> ${role}</p>
      </div>

      <p>Please login and change your password after first login.</p>
      <p>Thanks</p>
    </div>
  `;
};

export const adminCreateUserService = async (payload, adminId) => {
  const name = (payload?.name || '').trim();
  const email = (payload?.email || '').trim().toLowerCase();
  const phone = (payload?.phone || '').trim();
  const password = payload?.password;
  const role = payload?.role;

  if (!name) {
    const err = new Error('Full name is required');
    err.statusCode = 400;
    throw err;
  }

  if (!email) {
    const err = new Error('Email is required');
    err.statusCode = 400;
    throw err;
  }

  if (!password || String(password).length < 6) {
    const err = new Error('Password is required (min 6 chars)');
    err.statusCode = 400;
    throw err;
  }

  if (!role || !ALLOWED_CREATE_ROLES.includes(role)) {
    const err = new Error(
      `Role must be one of: ${ALLOWED_CREATE_ROLES.join(', ')}`
    );
    err.statusCode = 400;
    throw err;
  }

  const existing = await User.findOne({ email }).lean();
  if (existing) {
    const err = new Error('Email already exists');
    err.statusCode = 409;
    throw err;
  }

  // Create user (password will be hashed by your model pre-save hook)
  const created = await User.create({
    name,
    email,
    phone,
    password,
    role,
    createdBy: adminId,
    updatedBy: adminId
  });

  // Email credentials (admin typed password)
  const html = buildCredentialEmailHtml({ name, email, password, role });
  await sendEmail({
    to: email,
    subject: 'Your account credentials',
    html
  });

  // Return created user without sensitive fields
  const safeUser = await User.findById(created._id)
    .select(
      '-password -refreshToken -otp -otpExpires -otpVerified -resetExpires -__v'
    )
    .populate('createdBy', 'name email role')
    .populate('updatedBy', 'name email role')
    .lean();

  return safeUser;
};

export const adminListUsersService = async ({
  page = 1,
  limit = 10,
  role
} = {}) => {
  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);
  const skip = (pageNum - 1) * limitNum;

  const filter = {};
  if (role) filter.role = role;

  const [items, totalItems] = await Promise.all([
    User.find(filter)
      .select(
        '-password -refreshToken -otp -otpExpires -otpVerified -resetExpires -__v'
      )
      .populate('createdBy', 'name email role')
      .populate('updatedBy', 'name email role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    User.countDocuments(filter)
  ]);

  const totalPages = Math.max(Math.ceil(totalItems / limitNum), 1);

  return {
    items,
    pagination: {
      page: pageNum,
      limit: limitNum,
      totalItems,
      totalPages,
      hasNext: pageNum < totalPages,
      hasPrev: pageNum > 1
    }
  };
};

export const adminUpdateUserRoleService = async (userId, role, adminId) => {
  if (!role || !ALLOWED_CREATE_ROLES.includes(role)) {
    const err = new Error(
      `Role must be one of: ${ALLOWED_CREATE_ROLES.join(', ')}`
    );
    err.statusCode = 400;
    throw err;
  }

  const updated = await User.findByIdAndUpdate(
    userId,
    { $set: { role } },
    { new: true }
  )
    .select(
      '-password -refreshToken -otp -otpExpires -otpVerified -resetExpires -__v'
    )
    .lean();

  return updated; // can be null
};

export const adminDeleteUserService = async (userId) => {
  const deleted = await User.findByIdAndDelete(userId)
    .select(
      '-password -refreshToken -otp -otpExpires -otpVerified -resetExpires -__v'
    )
    .lean();

  return deleted; // can be null
};

export const adminGetSingleUserService = async (id) => {
  return await User.findById(id)
    .select("-password -refreshToken -otp -otpExpires -otpVerified -resetExpires -__v")
    .populate("createdBy", "name email role")
    .populate("updatedBy", "name email role")
    .lean();
};
