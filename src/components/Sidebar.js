import React from "react";
import "../css/Sidebar.css";
import logoImg from "../images/logo.png";
import bookImg from "../images/book.svg";
import fileImg from "../images/file.svg";
import peopleImg from "../images/people.svg";
import cityImg from "../images/city.svg";
import analyticsImg from "../images/analytics.svg";
import settingsImg from "../images/settings.svg";

export default function Sidebar() {
  return (
    <div className="Sidebar">
      <img className="Sidebar-logo" src={logoImg} alt="logo" />
      <nav>
        <ul>
          <li>
            <img src={bookImg} alt="book" />
            <div>База знаний</div>
          </li>
          <li>
            <img src={fileImg} alt="file" />
            <div>Заявки</div>
          </li>
          <li>
            <img src={peopleImg} alt="people" />
            <div>Сотрудники</div>
          </li>
          <li>
            <img src={cityImg} alt="clients" />
            <div>Клиенты</div>
          </li>
          <li>
            <img src={analyticsImg} alt="analytics" />
            <div>Активы</div>
          </li>
          <li>
            <img src={settingsImg} alt="settings" />
            <div>Настройки</div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
