import express from 'express';
import authRoutes from '../../entities/auth/auth.routes.js';
import userRoutes from '../../entities/user/user.routes.js';
import systemSettingRoutes from '../../entities/systemSetting/systemSetting.routes.js';
import { sessionRouter }  from '../../entities/session/session.route.js'; // import session routes
import adminUserRoutes from "../../entities/adminUser/adminUser.routes.js";

const router = express.Router();

router.use('/v1/auth', authRoutes);
router.use('/v1/user', userRoutes);
router.use('/v1/system-setting', systemSettingRoutes);
router.use('/v1/insight-engine', sessionRouter); // add this line for session routes
router.use("/v1/admin/users", adminUserRoutes);

export default router;
