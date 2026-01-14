import { TransactionButton } from "thirdweb/react";
import { setApprovalForAll } from "thirdweb/extensions/erc721";
import { toast } from "react-toastify";
import { NFT_COLLECTION, MARKETPLACE } from "@/const/contracts";
import toastStyle from "@/util/toastConfig";

export default function ApprovalButton() {
  return (
    <TransactionButton
      transaction={() => {
        return setApprovalForAll({
          contract: NFT_COLLECTION,
          operator: MARKETPLACE.address as `0x${string}`,
          approved: true,
        });
      }}
      onTransactionSent={() => {
        toast.loading("Approving...", {
        //   id: "approve",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
      onError={(error) => {
        toast(`Approval Failed!`, {
        //   icon: "❌",
        //   id: "approve",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
      onTransactionConfirmed={(txResult) => {
        toast("Approval successful.", {
        //   icon: "👍",
        //   id: "approve",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
    >
			Approve
    </TransactionButton>
  );
}