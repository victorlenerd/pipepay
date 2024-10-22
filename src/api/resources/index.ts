import express from "express";

import RequestRoute from "./request/request.route";
import InvoiceRouter from "./invoice/invoice.route";
import PaymentRoute from "./payment/payment.route";
import DisputeRoute from "./dispute/dispute.route";
import ConfirmRoute from "./confirm/confirm.route";
import BanksRoute from "./banks/banks.route";
import SellerRoute from "./seller/seller.route";
import CategoryRoute from "./categories/categories.route";
import WithdrawRouter from "./withdraw/withdraw.route";

import { verifyToken } from "../modules/auth";

const MainRouter = express.Router();

MainRouter.use("/banks", BanksRoute);
MainRouter.use("/confirm", ConfirmRoute);
MainRouter.use("/dispute", DisputeRoute);

MainRouter.use("/withdraw", verifyToken, WithdrawRouter);
MainRouter.use("/seller", verifyToken, SellerRoute);
MainRouter.use("/categories", verifyToken, CategoryRoute);
MainRouter.use("/request", verifyToken, RequestRoute);
MainRouter.use("/invoice", verifyToken, InvoiceRouter);
MainRouter.use("/payment", verifyToken, PaymentRoute);

export default MainRouter;
