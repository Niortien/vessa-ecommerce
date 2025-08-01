'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/public/Assets/images/logo.png';
import { UserRound } from 'lucide-react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useFinc } from '@/Store/Store';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useSession } from 'next-auth/react';
import { Button } from '../ui/button';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { signOut } from 'next-auth/react';

import { toast } from "sonner";
const Headers = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { data: session } = useSession();
  const { cartArray } = useFinc();
  const routeur = useRouter();

  const open = Boolean(anchorEl);
const handleDeconnexion = async () => {
  try {
    await signOut({ callbackUrl: "/login" }); // redirige vers la page de connexion
    toast.success("Déconnexion réussie !");
  } catch (error) {
    toast.error("Erreur lors de la déconnexion.");
  }
};
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  

  const handlclick = () => routeur.push('/panier');

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src={logo} alt="logo" width={100} height={500} />
          </Link>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className=" flex ml-2">
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                  {session?.user ? (
  <Avatar>
    <AvatarImage
      className="h-14 w-14 rounded-full"
      src={process.env.NEXT_PUBLIC_API_URL + '/' + session.user.image}
      alt="connecté"
    />
    <AvatarFallback>
      {session?.user.name?.slice(0, 2).toUpperCase() || 'U'}
    </AvatarFallback>
  </Avatar>
) : (
  <Link href="/login">
    <Button variant="outline" className="flex items-center gap-2">
      <UserRound className="w-4 h-4" />
      Connexion
    </Button>
  </Link>
)}

                  </IconButton>
                </Tooltip>
              </Box>

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Link href={'/dashboard'} >
                <MenuItem onClick={handleClose}>
                 Tableau de bord
                </MenuItem>
                </Link>
                {/* <MenuItem onClick={handleClose}>
                   My account
                </MenuItem> */}
                <Divider />
               <div onClick={handleDeconnexion}>
                 <MenuItem onClick={handleClose}>
                  <ListItemIcon >
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
               </div>
              </Menu>

              <div onClick={handlclick} className="ml-4 cursor-pointer">
                <Badge badgeContent={cartArray.length} color="primary">
                  <ShoppingCartIcon color="action" />
                </Badge>
              </div>
            </div>

            {/* Menu utilisateur visible sur clic */}
            <div
              className={`z-50 ${isUserDropdownOpen ? 'block' : 'hidden'} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm absolute mt-40 right-4 dark:bg-gray-700 dark:divide-gray-600`}
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                  name@flowbite.com
                </span>
              </div>
            </div>

            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Menu principal */}
          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="/shop"
                  className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                >
                  SHOP
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500"
                >
                  OUR STORY
                </Link>
              </li>
              <li>
                <Link
                  href="/collection"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500"
                >
                  COLLECTION
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500"
                >
                  BLOGS
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500"
                >
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Headers;
