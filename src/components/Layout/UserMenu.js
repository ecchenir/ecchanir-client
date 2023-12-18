import React from "react";
import { NavLink } from "react-router-dom";
import { useOrder } from "../../context/order";
import { Badge } from "antd";

const UserMenu = () => {
  const [order] = useOrder();
  return (
    <>
      <div className="text-center ">
        <div className="list-group ">
          <Badge count={order?.length} showZero>
            <NavLink
              to="/dashboard/user/orderShow"
              className="list-group-item list-group-item-action bg-success"
            >
              OrderShow
            </NavLink>
          </Badge>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
