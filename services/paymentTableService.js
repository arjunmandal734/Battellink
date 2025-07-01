import * as paymentModel from "../models/dynamo/paymentTableModel.js";
import CustomError from "../utils/customError.js";

// ✅ Save a New Payment
export const saveNewPayment = async (paymentData) => {
    try {
        const saved = await paymentModel.savePayment(paymentData);
        return {
            message: "Payment saved successfully",
            data: saved,
        };
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Error saving payment", error);
    }
};

// ✅ Get Payment by Payment ID
export const getPaymentDetailsById = async (paymentId) => {
    try {
        const payment = await paymentModel.getPaymentById(paymentId);
        if (!payment) {
            throw new CustomError(404, "Payment not found");
        }
        return {
            message: "Payment details fetched successfully",
            data: payment,
        };
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Error fetching payment details", error);
    }
};

// ✅ Get All Payments for a User
export const getUserPayments = async (userId) => {
    try {
        const payments = await paymentModel.getPaymentsByUser(userId);
        return {
            message: "User payments fetched successfully",
            data: payments,
        };
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Error fetching user payments", error);
    }
};

// ✅ Get All Payments for a Contest
export const getContestPayments = async (contestId) => {
    try {
        const payments = await paymentModel.getPaymentsByContest(contestId);
        return {
            message: "Contest payments fetched successfully",
            data: payments,
        };
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Error fetching contest payments", error);
    }
};

// ✅ Update Payment Status
export const changePaymentStatus = async (paymentId, status) => {
    try {
        const updated = await paymentModel.updatePaymentStatus(paymentId, status);
        return {
            message: "Payment status updated successfully",
            data: updated,
        };
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Error updating payment status", error);
    }
};

// ✅ Delete Failed Payment Record
export const removeFailedPayment = async (paymentId) => {
    try {
        const result = await paymentModel.deletePayment(paymentId);
        return {
            message: result.message,
        };
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Error deleting payment record", error);
    }
};
