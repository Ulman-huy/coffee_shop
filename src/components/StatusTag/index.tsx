import { Tag } from "antd";
import { useTranslation } from "react-i18next";

type Props = {
  status: string;
  full?: boolean;
  upper?: boolean;
  lower?: boolean;
  normal?: boolean;
};

function StatusTag({ status, full, upper, lower, normal }: Props) {
  const { t } = useTranslation();
  const listStatus: any = {
    ACTIVE: "#50bf46",
    DELETED: "#bf4646",
    COFFEE: "#4f2020",
    TEA: "#b0b644",
    DISHED: "#a6b3ab",
    STOP: "#de4e4e"
  };

  return (
    <Tag
      className={`${full && "w-full flex justify-center"} ${
        upper && "uppercase"
      } ${lower && "lowercase"} ${normal && "capitalize"}`}
      color={listStatus[status]}
    >
      {t(status.toLowerCase())}
    </Tag>
  );
}

export default StatusTag;
