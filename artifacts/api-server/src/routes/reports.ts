import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { reportsTable } from "@workspace/db/schema";
import { SubmitReportBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/reports", async (req, res) => {
  const parsed = SubmitReportBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { category, note } = parsed.data;

  const [report] = await db
    .insert(reportsTable)
    .values({ category, note: note ?? null })
    .returning();

  res.status(201).json({
    id: report.id,
    category: report.category,
    note: report.note,
    createdAt: report.createdAt,
  });
});

export default router;
