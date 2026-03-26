// src/entities/adminUser/adminUser.service.js
import RoleType from '../../lib/types.js';
import User from '../auth/auth.model.js';
import sendEmail from '../../lib/sendEmail.js';
import bcrypt from 'bcrypt';

const ALLOWED_CREATE_ROLES = [RoleType.TRAINER];
const ALLOWED_STATUSES = ['active', 'inactive'];

// const buildCredentialEmailHtml = ({ name, email, password, role }) => {
//   return `
//     <div style="font-family: Arial, sans-serif; line-height: 1.5;">
//       <h2>Account Created</h2>
//       <p>Hello ${name || 'User'},</p>
//       <p>An account has been created for you with the following credentials:</p>

//       <div style="background:#f4f4f4;padding:12px;border-radius:8px;">
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Password:</b> ${password}</p>
//         <p><b>Role:</b> ${role}</p>
//       </div>

//       <p>Please login with the above credentials.</p>
//       <p>Thanks</p>
//     </div>
//   `;
// };
// const websiteUrl = "https://story-academy.de"
// export const buildCredentialEmailHtml = ({ name, email, password}) => {
//   return `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; background-color: #f9f9f9;">
      
//       <!-- Header -->
//       <div style="background-color: #007BFF; padding: 30px; text-align: center;">
//         <h1 style="color: #ffffff; margin: 0; font-size: 26px;">Welcome to Our Platform! 🎉</h1>
//       </div>

//       <!-- Body -->
//       <div style="padding: 30px;">
//         <p style="font-size: 16px; color: #555;">Hi <strong>${name}</strong>,</p>
//         <p style="font-size: 16px; color: #555;">
//           We're thrilled to have you on board. Your account has been successfully created. 
//           Below are your login credentials — please keep them safe.
//         </p>

//         <!-- Credentials Box -->
//         <div style="background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; margin: 20px 0;">
//           <h3 style="color: #333; margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 10px;">🔐 Your Login Credentials</h3>
//           <table style="width: 100%; font-size: 15px; color: #555;">
//             <tr>
//               <td style="padding: 8px 0;"><strong>📧 Email:</strong></td>
//               <td style="padding: 8px 0;">${email}</td>
//             </tr>
//             <tr>
//               <td style="padding: 8px 0;"><strong>🔑 Password:</strong></td>
//               <td style="padding: 8px 0;">${password}</td>
//             </tr>
//           </table>
//         </div>

//         <p style="font-size: 14px; color: #e53935; font-weight: bold;">
//           ⚠️ For your security, please change your password after your first login.
//         </p>

//         <!-- CTA Button -->
//         <div style="text-align: center; margin: 30px 0;">
//           <a 
//             href="${websiteUrl}" 
//             style="background-color: #007BFF; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block;"
//           >
//             🚀 Login to Your Account
//           </a>
//         </div>

//         <p style="font-size: 15px; color: #555;">
//           If you have any questions or need help getting started, feel free to reach out to our support team.
//         </p>

//         <p style="font-size: 15px; color: #555;">
//           Best regards,<br/>
//           <strong>The Support Team</strong>
//         </p>
//       </div>

//       <!-- Footer -->
//       <div style="border-top: 1px solid #ddd; padding: 16px; text-align: center; background-color: #f1f1f1;">
//         <p style="font-size: 12px; color: #aaa; margin: 0;">
//           &copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.
//         </p>
//         <p style="font-size: 12px; color: #aaa; margin: 4px 0 0;">
//           <a href="${websiteUrl}" style="color: #007BFF; text-decoration: none;">Visit our website</a>
//         </p>
//       </div>

//     </div>
//   `;
// };
// export const adminCreateUserService = async (payload, adminId) => {
//   const name = (payload?.name || '').trim();
//   const email = (payload?.email || '').trim().toLowerCase();
//   const phone = (payload?.phone || '').trim();
//   const password = payload?.password;
//   const role = payload?.role;
//   const status = payload?.status || 'active';

//   if (!name) {
//     const err = new Error('Full name is required');
//     err.statusCode = 400;
//     throw err;
//   }

//   if (!email) {
//     const err = new Error('Email is required');
//     err.statusCode = 400;
//     throw err;
//   }

//   if (!phone) {
//     const err = new Error('Phone is required');
//     err.statusCode = 400;
//     throw err;
//   }

//   if (!password || String(password).length < 6) {
//     const err = new Error('Password is required (min 6 chars)');
//     err.statusCode = 400;
//     throw err;
//   }

//   if (!role || !ALLOWED_CREATE_ROLES.includes(role)) {
//     const err = new Error(
//       `Role must be one of: ${ALLOWED_CREATE_ROLES.join(', ')}`
//     );
//     err.statusCode = 400;
//     throw err;
//   }

//   if (!ALLOWED_STATUSES.includes(status)) {
//     const err = new Error(`Status must be one of: ${ALLOWED_STATUSES.join(', ')}`);
//     err.statusCode = 400;
//     throw err;
//   }

//   const existing = await User.findOne({ email }).lean();
//   if (existing) {
//     const err = new Error('Email already exists');
//     err.statusCode = 409;
//     throw err;
//   }
//   const rawPassword = password;

//   // Create user (password will be hashed by your model pre-save hook)
//   const created = await User.create({
//     name,
//     email,
//     phone,
//     password,
//     role,
//     status,
//     createdBy: adminId,
//     updatedBy: adminId
//   });

//   // // Email credentials (admin typed password)
//   // const html = buildCredentialEmailHtml({ name, email, password, role });
//   // await sendEmail({
//   //   to: email,
//   //   subject: 'Your account credentials',
//   //   html
//   // });

//   // Return created user without sensitive fields
//   const safeUser = await User.findById(created._id)
//     rawPassword
//     .select(
//       '-refreshToken -otp -otpExpires -otpVerified -resetExpires -__v'
//     )
//     .populate('createdBy', 'name email role')
//     .populate('updatedBy', 'name email role')
//     .lean();

//   return safeUser;
// };
export const adminCreateUserService = async (payload, adminId) => {
  const name = (payload?.name || '').trim();
  const email = (payload?.email || '').trim().toLowerCase();
  const phone = (payload?.phone || '').trim();
  const password = payload?.password;
  const role = payload?.role;
  const status = payload?.status || 'active';

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

  if (!phone) {
    const err = new Error('Phone is required');
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

  if (!ALLOWED_STATUSES.includes(status)) {
    const err = new Error(`Status must be one of: ${ALLOWED_STATUSES.join(', ')}`);
    err.statusCode = 400;
    throw err;
  }

  const existing = await User.findOne({ email }).lean();
  if (existing) {
    const err = new Error('Email already exists');
    err.statusCode = 409;
    throw err;
  }

  const rawPassword = password;

  // Create user (password will be hashed by your model pre-save hook)
  const created = await User.create({
    name,
    email,
    phone,
    password,
    role,
    status,
    createdBy: adminId,
    updatedBy: adminId
  });

  // Return created user without sensitive fields
  const safeUser = await User.findById(created._id)
    .select('-refreshToken -otp -otpExpires -otpVerified -resetExpires -__v')
    .populate('createdBy', 'name email role')
    .populate('updatedBy', 'name email role')
    .lean();

  // Add rawPassword manually
  if (safeUser) {
    safeUser.rawPassword = rawPassword;
  }

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

export const adminUpdateUserRoleService = async (userId, role, status, adminId, extras = {}) => {
  const updateFields = {};

  if (extras.name !== undefined) {
    const name = String(extras.name || '').trim();
    if (!name) {
      const err = new Error('Full name is required');
      err.statusCode = 400;
      throw err;
    }
    updateFields.name = name;
  }

  if (extras.email !== undefined) {
    const email = String(extras.email || '').trim().toLowerCase();
    if (!email) {
      const err = new Error('Email is required');
      err.statusCode = 400;
      throw err;
    }
    const existing = await User.findOne({ email, _id: { $ne: userId } }).lean();
    if (existing) {
      const err = new Error('Email already exists');
      err.statusCode = 409;
      throw err;
    }
    updateFields.email = email;
  }

  if (extras.phone !== undefined) {
    const phone = String(extras.phone || '').trim();
    if (!phone) {
      const err = new Error('Phone is required');
      err.statusCode = 400;
      throw err;
    }
    updateFields.phone = phone;
  }

  if (extras.password !== undefined) {
    const password = extras.password;
    if (!password || String(password).length < 6) {
      const err = new Error('Password is required (min 6 chars)');
      err.statusCode = 400;
      throw err;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    updateFields.password = hashedPassword;
  }

  if (role !== undefined) {
    if (!ALLOWED_CREATE_ROLES.includes(role)) {
      const err = new Error(`Role must be one of: ${ALLOWED_CREATE_ROLES.join(', ')}`);
      err.statusCode = 400;
      throw err;
    }
    updateFields.role = role;
  }

  if (status !== undefined) {
    if (!ALLOWED_STATUSES.includes(status)) {
      const err = new Error(`Status must be one of: ${ALLOWED_STATUSES.join(', ')}`);
      err.statusCode = 400;
      throw err;
    }
    updateFields.status = status;
  }

  if (Object.keys(updateFields).length === 0) {
    const err = new Error('At least one of name, email, phone, password, role or status is required');
    err.statusCode = 400;
    throw err;
  }

  updateFields.updatedBy = adminId;

  const updated = await User.findByIdAndUpdate(
    userId,
    { $set: updateFields },
    { new: true }
  )
    .select(
      '-password -refreshToken -otp -otpExpires -otpVerified -resetExpires -__v'
    )
    .lean();

  return updated; // can be null
};

export const adminUpdateUserStatusService = async (userId, status, adminId) => {
  if (!ALLOWED_STATUSES.includes(status)) {
    const err = new Error(`Status must be one of: ${ALLOWED_STATUSES.join(', ')}`);
    err.statusCode = 400;
    throw err;
  }

  const updated = await User.findByIdAndUpdate(
    userId,
    { $set: { status, updatedBy: adminId } },
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
