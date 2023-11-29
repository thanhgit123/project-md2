import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { BiSearch } from "react-icons/bi";
import { SiNike, SiAdidas } from "react-icons/si";
import { GiConverseShoe, GiBallerinaShoes } from "react-icons/gi";
import Button from "@mui/material/Button";
import yeah from "../../../assets/image/yeah.png";
import { BsCartPlusFill } from "react-icons/bs";
import {
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const products = [
  {
    name: "Giày Nike",
    description: "Cực Chất  :)))",
    href: "/category/Nike",
    icon: SiNike,
  },
  {
    name: "Giày Convert",
    description: "Cực Dễ  Xỏ  :)))",
    href: "/category/Convert",
    icon: GiConverseShoe,
  },
  {
    name: "Giày Adidas",
    description: "Cực Đắt :))) ",
    href: "/category/Adidas",
    icon: SiAdidas,
  },
  {
    name: "Giày Vans",
    description: "Cực Cực  :)))",
    href: "/category/Vans",
    icon: GiBallerinaShoes,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const checkLogin = useSelector((state) => state.user.checkLogin);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-[999] bg-white ">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <NavLink to="/" className="-m-1.5 p-1.5">
            <img className="h-12 w-19 " src={yeah} alt="" />
          </NavLink>
          <NavLink to="/" className="mt-2">
            <span className=" text-2xl">AMARA</span>
          </NavLink>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Sản Phẩm
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <Link
                          to={item.href}
                          className="block font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <NavLink
            to="/"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Trang Chủ
          </NavLink>
          <NavLink
            to="/introduce"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Giới Thiệu
          </NavLink>
          <NavLink
            to="/kontact"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Liên Hệ
          </NavLink>
          {/* <a className=" w-20  h-7  flex">
            <input
              className="w-96 border-2 border-rose-300 rounded-sm"
              type="text"
              placeholder="Tìm Kiếm"
              style={{ fontSize: "14px" }}
            />
            <Button variant="contained">
              <BiSearch></BiSearch>
            </Button>
          </a> */}
        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 ml-12 justify-around  ">
          {checkLogin || currentUser?.id ? (
            <Link to="/cart" className=" flex mt-1 ml-10">
              {" "}
              <BsCartPlusFill />
            </Link>
          ) : (
            ""
          )}

          {checkLogin || currentUser?.id ? (
            <div
              className="cursor-pointer text-red-500  justify-around"
              onClick={handleLogout}
            >
              Log Out
            </div>
          ) : (
            <NavLink
              to="/loggin"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </NavLink>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10  " />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between pt-[90px]">
            <NavLink to="/" className="-m-1.5 p-1.5">
              <img className="h-8 w-auto" src={yeah} alt="" />
            </NavLink>
            <NavLink to="/" className="mt-2">
              <span className=" text-2xl">AMARA</span>
            </NavLink>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <a className=" w-960  h-7  flex">
                        <input
                          className="w-96 border-2 border-rose-300 rounded-sm"
                          type="text"
                          placeholder="Tìm Kiếm"
                          style={{ fontSize: "14px" }}
                        />
                        <Button variant="contained">
                          <BiSearch></BiSearch>
                        </Button>
                      </a>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Sản Phẩm
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                <NavLink
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Trang Chủ
                </NavLink>
                <NavLink
                  to="/introduce"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Giới Thiệu
                </NavLink>
                <NavLink
                  to="/kontact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Liên Hệ
                </NavLink>
              </div>
              <div className="py-6">
                <Link
                  to="/loggin"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
