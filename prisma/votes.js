import { findBill, updateBill } from "./bills";
import prisma from "./prisma";

// READ
export const getBillVotes = async (billId) => {
  const votes = await prisma.vote.findMany({
    where: { billId },
  });
  return votes;
};

export const getVote = async (billId, userId) => {
  const vote = await prisma.vote.findFirst({
    where: { billId, userId },
    select: {
      id: true,
      value: true,
    },
  });
  return vote;
};

// POST
export const postVote = async (body) => {
  const { value, userId, billId } = body;
  const vote = await getVote(billId, userId);
  const bill = await findBill(billId);
  const billVotes = await getBillVotes(billId);
  const billVotesCount = billVotes.length;
  console.log("billVotesCount :>> ", billVotesCount);
  if (vote) {
    await prisma.vote.update({
      where: {
        id: vote.id,
      },
      data: {
        value,
      },
    });

    const newRating =
      (bill.rating * billVotesCount - vote.value + value) / billVotesCount;
    await updateBill(billId, { rating: newRating });

    return newRating;
  } else {
    await prisma.vote.create({
      data: {
        value,
        userId,
        billId,
      },
    });

    const newRating =
      (bill.rating * billVotesCount + value) / (billVotesCount + 1);
    await updateBill(billId, { rating: newRating });

    return newRating;
  }
};
