import React from 'react';

const Header = ({ avatar, username, onLogout, isLoggingOut }) => {
  return (
    <header className="header">
      <div className="user">
        <img className="user__avatar" src={avatar} />
        <p className="user__name">{username}</p>
      </div>
      <button className="header__logout" disabled={isLoggingOut} onClick={onLogout}>
        <span>Log out</span>
      </button>

      <style jsx>{`
        .header {
          background: rgba(0, 0, 0, .7);
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .user {
          display: flex;
          align-items: center;
          flex: 0 0 50%;
        }
        .user__avatar {
          border-radius: .4rem;
          margin-right: 1rem;
          width: 4.8rem;
          height: 4.8rem;
        }
        .user__name {
          color: #fff;
          font: 2rem/2.5rem 'Merienda One', serif;

        }
        .header__logout {
          margin: 0;
          padding: 1rem;
          border-radius: .4rem;
          border: none;
          cursor: pointer;
          background: rgba(145, 92, 182, .7);
          transition: background .2s;
        }
        .header__logout:hover {
          background: rgba(145, 92, 182, .9);
        }
        .header__logout[disabled] {
          background: rgba(145, 92, 182, .3);
          cursor: not-allowed;
        }
        .header__logout[disabled] span {
          opacity: .6;
        }
        .header__logout span {
          line-height: 1rem;
          display: flex;
          align-items: center;
          font: 1.4rem sans-serif;
          color: #fff;
        }
        .header__logout span:before {
          content: '';
          margin-right: .5rem;
          width: 1.6rem;
          height: 1.6rem;
          background: url('/static/sign-out.svg') center no-repeat;
          background-size: contain;
        }
      `}</style>
    </header>
  );
};

export default Header;
