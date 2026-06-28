import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import appointmentsRouter from "./appointments";
import consultationsRouter from "./consultations";
import newsletterRouter from "./newsletter";
import servicesRouter from "./services";
import faqRouter from "./faq";
import blogRouter from "./blog";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(appointmentsRouter);
router.use(consultationsRouter);
router.use(newsletterRouter);
router.use(servicesRouter);
router.use(faqRouter);
router.use(blogRouter);
router.use(statsRouter);

export default router;
