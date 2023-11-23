import { Avatar, Badge, Col, Popover, Row, Space, Typography } from "antd";
import { FaBell } from "react-icons/fa6";
import { BiGlobe } from "react-icons/bi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  changeLanguage,
  changeTheme,
} from "../../../redux/reducer/settingReducer";
import i18n from "../../../config/i18n";
import { CgLogOut } from "react-icons/cg";
import { LuSettings, LuUser } from "react-icons/lu";
import { TbSunLow, TbMoon } from "react-icons/tb";

function HeaderAdmin() {
  const [open, setOpen] = useState(false);
  const user = useSelector((state: any) => state.user.data);
  const setting = useSelector((state: any) => state.setting);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleChangeLanguage = (lng: string) => {
    dispatch(changeLanguage(lng));
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  const handleChangeTheme = (theme: string) => {
    dispatch(changeTheme(theme));
  };

  return (
    <>
      <Row
        justify={"end"}
        style={{ boxShadow: "0 4px 2px -2px #dddddd80", padding: "7px 24px" }}
        className="bg-white"
      >
        <Space align="center" size={"large"}>
          <Col className="mt-2 text-black">
            {setting.theme == "light" ? (
              <span
                onClick={() => handleChangeTheme("dark")}
                className="text-2xl cursor-pointer"
              >
                <TbSunLow />
              </span>
            ) : (
              <span
                onClick={() => handleChangeTheme("light")}
                className="text-xl cursor-pointer"
              >
                <TbMoon />
              </span>
            )}
          </Col>
          <div style={{ marginTop: 8 }}>
            <Popover
              trigger="click"
              placement="bottomRight"
              overlayClassName="popover-select-notify"
              content={
                <ul className="select-notify" style={{ minWidth: 350 }}>
                  <li>
                    <Typography.Title level={4}>
                      {t("common.notify")}
                    </Typography.Title>
                  </li>
                  <li>
                    <span></span>
                    <span>Thông báo 1</span>
                  </li>
                  <li>
                    <span></span>
                    <span>Thông báo 2</span>
                  </li>
                  <li>
                    <span></span>
                    <span>Thông báo 3</span>
                  </li>
                </ul>
              }
            >
              <Badge count={0} showZero size="small" className="cursor-pointer">
                <FaBell style={{ fontSize: 20 }} />
              </Badge>
            </Popover>
          </div>
          <Popover
            open={open}
            onOpenChange={(e) => setOpen(e)}
            content={
              <ul>
                <li
                  onClick={() => handleChangeLanguage("vi")}
                  className="flex gap-2 py-1 cursor-pointer"
                >
                  <Avatar
                    src="https://i.pinimg.com/736x/98/9b/9c/989b9c38c26172c25bd2dca461340deb.jpg"
                    size="small"
                  />
                  <span>Tiếng Việt</span>
                </li>
                <li
                  onClick={() => handleChangeLanguage("en")}
                  className="flex gap-2 py-1 cursor-pointer"
                >
                  <Avatar
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png"
                    size="small"
                  />
                  <span>English</span>
                </li>
              </ul>
            }
            overlayClassName="popover-select-lng"
            trigger="click"
            placement="bottom"
          >
            <span className="text-2xl mt-2 block cursor-pointer text-black">
              <BiGlobe />
            </span>
          </Popover>
          <Popover
            trigger="click"
            placement="bottomRight"
            overlayClassName="popover-select-avatar"
            content={
              <ul className="select-avatar min-w-[150px]">
                <li className="flex cursor-pointer py-[6px] gap-2 justify-center">
                  <span style={{ fontWeight: 700 }}>{user.username}</span>
                </li>
                <li className="flex cursor-pointer py-[6px] gap-2">
                  <LuUser style={{ fontSize: 20 }} />
                  <span>{t("common.account")}</span>
                </li>
                <li className="flex cursor-pointer py-[6px] gap-2">
                  <LuSettings style={{ fontSize: 20 }} />
                  <span>{t("common.setting")}</span>
                </li>
                <li className="flex cursor-pointer py-[6px] gap-2">
                  <CgLogOut style={{ fontSize: 20 }} />
                  <span>{t("common.logout")}</span>
                </li>
              </ul>
            }
          >
            <Avatar
              src={user.avatar}
              style={{ verticalAlign: "middle" }}
              size="large"
              className="cursor-pointer"
            />
          </Popover>
        </Space>
      </Row>
    </>
  );
}

export default HeaderAdmin;
