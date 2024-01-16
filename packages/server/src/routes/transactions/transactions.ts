import { FastifyInstance } from "fastify";

import createDebug from "../../configs/debug";

import * as TransactionOperations from "../../operations/transactions";

const debug = createDebug("profiles:api");

const schema = {
  body: {
    type: "object",
    required: ["amount", "description"],
    properties: {
      amount: { type: "number" },
      description: { type: "string" },
    },
  },
};

export default function transactionRoutes(fastify: FastifyInstance, _, next) {
  fastify.get("/", async (request, reply) => {
    const { page = 1, limit = 5 } = request.query as {
      page: number;
      limit: number;
    };
    const user = fastify.user;

    const transactions =
      await TransactionOperations.listTransactionsByProfileId(user.id, {
        page,
        limit,
      });

    debug("Transactions got successfully");
    return reply.status(200).type("json").send({
      status: "ok",
      data: transactions.rows,
      meta: transactions.meta,
    });
  });

  fastify.post("/", { schema }, async (request, reply) => {
    const user = fastify.user;
    const { amount, description } = request.body as {
      amount: number;
      description: string;
    };

    try {
      const transaction = await TransactionOperations.createTransaction({
        profileId: user.id,
        amount,
        description,
      });

      debug("Transaction created successfully");
      return reply.status(201).type("json").send({
        status: "ok",
        data: transaction,
      });
    } catch (error) {
      debug(`Error creating transaction: ${error.message}`);
      throw error;
    }
  });

  fastify.put("/:id", { schema }, async (request, reply) => {
    const user = fastify.user;
    const { id } = request.params as { id: string };
    const { amount, description } = request.body as {
      amount: number;
      description: string;
    };

    try {
      const transaction = await TransactionOperations.updateTransaction({
        id,
        profileId: user.id,
        amount,
        description,
      });

      debug("Transaction updated successfully");
      return reply.status(200).type("json").send({
        status: "ok",
        data: transaction,
      });
    } catch (error) {
      debug(`Error updating transaction: ${error.message}`);
      throw error;
    }
  });

  fastify.delete("/:id", async (request, reply) => {
    const user = fastify.user;
    const { id } = request.params as { id: string };

    try {
      await TransactionOperations.removeTransaction({
        id,
        profileId: user.id,
      });

      debug("Transaction deleted successfully");
      return reply.status(200).type("json").send({
        status: "ok",
      });
    } catch (error) {
      debug(`Error deleting transaction: ${error.message}`);
      throw error;
    }
  });

  next();
}
