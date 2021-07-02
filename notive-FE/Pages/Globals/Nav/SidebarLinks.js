import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as FcIcons from 'react-icons/fc';
import * as FiIcons from 'react-icons/fi';
// import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const sidebarLinks = [
  
  {
    title: 'Stats',
    path: '/stats',
    icon: <FcIcons.FcStatistics />,
    disabled:true,
    cName: 'nav-text grade-out-disabled'
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <FiIcons.FiSettings />,
    disabled:false,
    cName: 'nav-text'
  },
  // {
  //   title: 'Team',
  //   path: '/team',
  //   icon: <IoIcons.IoMdPeople />,
  //   disabled:true,
  //   cName: 'nav-text grade-out-disabled'
  // },
  // {
  //   title: 'Messages',
  //   path: '/messages',
  //   icon: <FaIcons.FaEnvelopeOpenText />,
  //   disabled:true,
  //   cName: 'nav-text grade-out-disabled'
  // },
  // {
  //   title: 'Support',
  //   path: '/support',
  //   icon: <IoIcons.IoMdHelpCircle />,
  //   disabled:true,
  //   cName: 'nav-text grade-out-disabled'
  // }
];