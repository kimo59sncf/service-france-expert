import { Router } from "express";
import { getLeadCount, getPendingLeadCount } from "../lib/local-store";

const router = Router();

router.get("/stats", async (_req, res) => {
  const totalLeads = await getLeadCount();
  const pendingLeads = await getPendingLeadCount();

  res.json({
    totalContactRequests: totalLeads,
    totalAppointments: totalLeads,
    totalConsultations: totalLeads,
    totalNewsletterSubscribers: totalLeads,
    pendingAppointments: pendingLeads,
    completedConsultations: 0,
  });
});

export default router;
