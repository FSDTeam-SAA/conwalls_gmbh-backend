import express from 'express';
import authRoutes from '../../entities/auth/auth.routes.js';
import userRoutes from '../../entities/user/user.routes.js';
import systemSettingRoutes from '../../entities/systemSetting/systemSetting.routes.js';
import { sessionRouter }  from '../../entities/session/session.route.js'; // import session routes
import adminUserRoutes from "../../entities/adminUser/adminUser.routes.js";
import { TrainerRouter } from '../../entities/trainer/trainer.route.js';
import { measureRouter } from '../../entities/measure/measure.route.js';
import { stakeholderRouter } from '../../entities/stackholder/stackholder.route.js';

const router = express.Router();

router.use('/v1/auth', authRoutes);
router.use('/v1/user', userRoutes);
router.use('/v1/system-setting', systemSettingRoutes);
router.use('/v1/insight-engine', sessionRouter); // add this line for session routes
router.use("/v1/admin/trainer", adminUserRoutes);
router.use("/v1/trainer", TrainerRouter);
router.use('/v1/measure', measureRouter)
router.use('/v1/stakeholder', stakeholderRouter)

export default router;
