import { useRouter } from "@tanstack/react-router";
import React from "react";
import '../../styles/common/Header.scss'

const routeName = [
  ['profile', '프로필'],
  ['chatrooms', '채팅'],
  ['reviews', '후가']
]

const Header: React.FC = () => {
  const router = useRouter();
  const currentPath = router.state.location.pathname.split('/')[1];

  return (<>
    {routeName.map(name => {
      if (name[0] === currentPath) {
        return (
          <div className="header" key={name[0]}>
            <div className="header__title">
              {name[1]}
            </div>
          </div>
        )
      }
    })}
  </>)
};

export default Header;
