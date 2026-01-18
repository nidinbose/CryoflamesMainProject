import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsers, updateUserStatus, } from "../../Features/adminSlice";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaGraduationCap,
  FaMoneyBill,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
  FaHome,
  FaUsers,
  FaBook,
  FaCreditCard,
  FaFileAlt,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaCheck,
  FaClock,
  FaBan,
  FaEye,
} from "react-icons/fa";
import { userLogout } from "../../Features/authSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  const { users, loading } = useSelector((state) => state.admin);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmallScreen(width < 768);
      setIsMediumScreen(width >= 768 && width < 1024);
      
      if (width >= 1024) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && isSmallScreen && !event.target.closest('aside') && !event.target.closest('button[aria-label="Open sidebar"]')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen, isSmallScreen]);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") navigate("/login");
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleAction = useCallback((id, status) => {
    dispatch(updateUserStatus({ userId: id, status }));
  }, [dispatch]);

  const toggleRow = useCallback((id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  const handleSidebarLinkClick = useCallback((path) => {
    navigate(path);
    if (isSmallScreen || isMediumScreen) {
      setSidebarOpen(false);
    }
  }, [navigate, isSmallScreen, isMediumScreen]);

  if (!isAuthenticated || user?.role !== "admin") return null;

  const totalUsers = users.length;
  const pendingUsers = users.filter((u) => u.status === "pending").length;
  const approvedUsers = users.filter((u) => u.status === "approved").length;
  const blockedUsers = users.filter((u) => u.status === "blocked").length;

  const getSidebarWidth = () => {
    if (isSmallScreen) return "w-full max-w-xs";
    if (isMediumScreen) return "w-64";
    return "w-72";
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {sidebarOpen && (isSmallScreen || isMediumScreen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`
          fixed md:relative inset-y-0 left-0 z-50 
          bg-[#2f3834] text-gray-200 
          ${getSidebarWidth()}
          flex flex-col 
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          ${isMediumScreen && sidebarOpen ? 'shadow-xl' : ''}
        `}
      >
        <div className="p-5 sm:p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                <FaUser className="text-gray-300" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">Admin Panel</h1>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">Welcome, {user?.name}</p>
              </div>
            </div>
            {(isSmallScreen || isMediumScreen) && (
              <button 
                onClick={() => setSidebarOpen(false)}
                className="text-gray-300 hover:text-white transition-colors p-1"
                aria-label="Close sidebar"
              >
                <FaTimes size={20} />
              </button>
            )}
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <SidebarLink 
            text="Dashboard" 
            icon={<FaHome />} 
            active={true}
            onClick={() => handleSidebarLinkClick("/admin")}
            compact={isMediumScreen && !sidebarOpen}
          />
          <SidebarLink 
            text="Students" 
            icon={<FaUsers />} 
            onClick={() => handleSidebarLinkClick("/admin/StudentsAdmin")}
            compact={isMediumScreen && !sidebarOpen}
          />
          <SidebarLink 
            text="Courses" 
            icon={<FaBook />} 
            onClick={() => handleSidebarLinkClick("/admin/CoursesAdmin")}
            compact={isMediumScreen && !sidebarOpen}
          />
          <SidebarLink 
            text="Payments" 
            icon={<FaCreditCard />} 
            onClick={() => handleSidebarLinkClick("/admin/payments")}
            compact={isMediumScreen && !sidebarOpen}
          />
          <SidebarLink 
            text="Add Admin" 
            icon={<FaFileAlt />} 
            onClick={() => handleSidebarLinkClick("/admin/AddAdmin")}
            compact={isMediumScreen && !sidebarOpen}
          />
          
          <div className="pt-4 mt-4 border-t border-gray-700">
            <SidebarLink 
              text="Settings" 
              icon={<FaCog />} 
              onClick={() => handleSidebarLinkClick("/admin/settings")}
              compact={isMediumScreen && !sidebarOpen}
            />
            <SidebarLink 
              text="Logout" 
              icon={<FaSignOutAlt />} 
               onClick={() => {
              dispatch(userLogout());
              navigate("/login");
  }}
              compact={isMediumScreen && !sidebarOpen}
            />
          </div>
        </nav>

        {(isMediumScreen && !sidebarOpen) ? null : (
          <div className="p-4 border-t border-gray-700">
            <div className="text-xs text-gray-400 text-center">
              <p>© 2024 • v1.0.0</p>
              <p className="mt-1">Admin Dashboard</p>
            </div>
          </div>
        )}
      </aside>
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">
        <header className="sticky top-0 z-30 bg-white shadow border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="text-gray-600 hover:text-gray-900 focus:outline-none p-1"
                  aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                >
                  <FaBars size={isSmallScreen ? 20 : 22} />
                </button>
                <div>
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                    Dashboard
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                    Manage your system efficiently
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="hidden sm:flex items-center space-x-3">
                  <div className="text-right">
                    <p className="font-medium text-gray-900 text-sm lg:text-base">{user?.name}</p>
                    <p className="text-xs text-gray-600">Administrator</p>
                  </div>
                  <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-300">
                    <span className="font-bold text-white text-sm lg:text-base">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="sm:hidden">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                    <span className="font-bold text-white text-sm">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="mb-6 sm:mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              <StatCard 
                title="Total Students" 
                value={totalUsers} 
                icon={<FaUsers className="text-gray-400" />}
              />
              <StatCard 
                title="Pending" 
                value={pendingUsers} 
                icon={<FaClock className="text-gray-400" />}
              />
              <StatCard 
                title="Approved" 
                value={approvedUsers} 
                icon={<FaCheck className="text-gray-400" />}
              />
              <StatCard 
                title="Blocked" 
                value={blockedUsers} 
                icon={<FaBan className="text-gray-400" />}
              />
            </div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    User Management
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Manage student accounts and permissions
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden md:block overflow-x-auto">
              <div className="min-w-full">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 lg:px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap">
                        User Info
                      </th>
                      <th className="py-3 px-4 lg:px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap">
                        Contact
                      </th>
                      <th className="py-3 px-4 lg:px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap">
                        Status
                      </th>
                      <th className="py-3 px-4 lg:px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {loading ? (
                      <TableLoading colSpan={4} />
                    ) : users.length === 0 ? (
                      <TableEmpty colSpan={4} />
                    ) : (
                      users.map((u) => (
                        <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4 lg:px-6">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3 border border-gray-300">
                                <span className="font-bold text-white">
                                  {u.name?.charAt(0)?.toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{u.name}</p>
                                <p className="text-sm text-gray-600">ID: {u.accessId}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 lg:px-6">
                            <div className="space-y-1">
                              <div className="flex items-center text-gray-700">
                                <FaEnvelope className="w-3 h-3 mr-2" />
                                <span className="text-sm break-all">{u.email}</span>
                              </div>
                              {u.phone && (
                                <div className="flex items-center text-gray-700">
                                  <FaPhone className="w-3 h-3 mr-2" />
                                  <span className="text-sm">{u.phone}</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4 lg:px-6">
                            <StatusBadge status={u.status} />
                            {u.lastLogin && (
                              <p className="text-xs text-gray-500 mt-1">
                                Last login: {new Date(u.lastLogin).toLocaleDateString()}
                              </p>
                            )}
                          </td>
                          <td className="py-4 px-4 lg:px-6">
                            <div className="flex flex-wrap gap-2">
                              {u.status === "pending" && (
                                <>
                                  <ActionButton 
                                    text="Approve" 
                                    variant="success"
                                    onClick={() => handleAction(u._id, "approved")}
                                    size="sm"
                                  />
                                  <ActionButton 
                                    text="Reject" 
                                    variant="danger"
                                    onClick={() => handleAction(u._id, "rejected")}
                                    size="sm"
                                  />
                                </>
                              )}
                              {u.status === "approved" && (
                                <>
                                  <ActionButton 
                                    text="View" 
                                    variant="primary"
                                    onClick={() => navigate(`/admin/users/${u._id}`)}
                                    size="sm"
                                  />
                                  <ActionButton 
                                    text="Block" 
                                    variant="warning"
                                    onClick={() => handleAction(u._id, "blocked")}
                                    size="sm"
                                  />
                                </>
                              )}
                              {u.status === "blocked" && (
                                <ActionButton 
                                  text="Unblock" 
                                  variant="primary"
                                  onClick={() => handleAction(u._id, "approved")}
                                  size="sm"
                                />
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:hidden">
              {loading ? (
                <div className="py-8">
                  <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-900 border-t-transparent"></div>
                    <p className="mt-3 text-gray-600">Loading users...</p>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {users.map((u) => (
                    <div key={u._id} className="p-4">
                      <div 
                        className="flex items-start justify-between cursor-pointer"
                        onClick={() => toggleRow(u._id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 border border-gray-300">
                            <span className="font-bold text-white text-lg">
                              {u.name?.charAt(0)?.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">{u.name}</h3>
                            <p className="text-sm text-gray-600 truncate mt-1">{u.email}</p>
                            <div className="flex items-center mt-2">
                              <StatusBadge status={u.status} />
                              <span className="text-xs text-gray-500 ml-2">
                                ID: {u.accessId}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className="text-gray-400 ml-2">
                          {expandedRows[u._id] ? (
                            <FaChevronUp size={16} />
                          ) : (
                            <FaChevronDown size={16} />
                          )}
                        </button>
                      </div>

                      {expandedRows[u._id] && (
                        <div className="mt-4 pl-15 space-y-3">
                          {u.phone && (
                            <div className="flex items-center text-sm text-gray-600">
                              <FaPhone className="w-3.5 h-3.5 mr-2" />
                              <span>{u.phone}</span>
                            </div>
                          )}
                          {u.joinedAt && (
                            <div className="flex items-center text-sm text-gray-600">
                              <FaCalendar className="w-3.5 h-3.5 mr-2" />
                              <span>Joined: {new Date(u.joinedAt).toLocaleDateString()}</span>
                            </div>
                          )}
                          
                          <div className="pt-3 border-t border-gray-200">
                            <div className="grid grid-cols-2 gap-2">
                              {u.status === "pending" && (
                                <>
                                  <ActionButton 
                                    text="Approve" 
                                    variant="success"
                                    onClick={() => handleAction(u._id, "approved")}
                                    fullWidth
                                  />
                                  <ActionButton 
                                    text="Reject" 
                                    variant="danger"
                                    onClick={() => handleAction(u._id, "rejected")}
                                    fullWidth
                                  />
                                </>
                              )}
                              {u.status === "approved" && (
                                <>
                                  <ActionButton 
                                    text="View" 
                                    variant="primary"
                                    onClick={() => navigate(`/admin/users/${u._id}`)}
                                    fullWidth
                                  />
                                  <ActionButton 
                                    text="Block" 
                                    variant="warning"
                                    onClick={() => handleAction(u._id, "blocked")}
                                    fullWidth
                                  />
                                </>
                              )}
                              {u.status === "blocked" && (
                                <ActionButton 
                                  text="Unblock" 
                                  variant="primary"
                                  onClick={() => handleAction(u._id, "approved")}
                                  fullWidth
                                  className="col-span-2"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="px-4 sm:px-6 py-3 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-medium">{users.length}</span> of{" "}
                  <span className="font-medium">{users.length}</span> users
                </p>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                    Previous
                  </button>
                  <span className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded-lg">
                    1
                  </span>
                  <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm hover:shadow transition-shadow duration-200">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs sm:text-sm text-gray-600 mb-1">{title}</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{value.toLocaleString()}</h2>
      </div>
      <div className="p-2 bg-gray-100 rounded-lg">
        {icon}
      </div>
    </div>
  </div>
);

const ActionButton = ({ text, variant, onClick, size = "md", fullWidth = false, className = "" }) => {
  const variants = {
    primary: "bg-gray-800 hover:bg-gray-900 text-white",
    success: "bg-gray-800 hover:bg-gray-900 text-white",
    danger: "bg-gray-800 hover:bg-gray-900 text-white",
    warning: "bg-gray-800 hover:bg-gray-900 text-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${variants[variant] || variants.primary}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        font-medium rounded-lg
        transition-all duration-200 hover:shadow active:scale-95
        ${className}
      `}
    >
      {text}
    </button>
  );
};

const SidebarLink = ({ text, icon, onClick, active = false, compact = false }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200
      ${active 
        ? 'bg-gray-800 text-white' 
        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }
      ${compact ? 'justify-center px-3' : ''}
    `}
    title={compact ? text : undefined}
  >
    <span className={`${compact ? 'text-lg' : ''}`}>{icon}</span>
    {!compact && <span className="font-medium ml-3">{text}</span>}
  </button>
);

const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch(status) {
      case 'approved': 
        return { 
          bg: 'bg-gray-100', 
          text: 'text-gray-800',
          border: 'border border-gray-300'
        };
      case 'pending': 
        return { 
          bg: 'bg-gray-100', 
          text: 'text-gray-800',
          border: 'border border-gray-300'
        };
      case 'blocked': 
        return { 
          bg: 'bg-gray-800', 
          text: 'text-white',
          border: 'border border-gray-900'
        };
      case 'rejected': 
        return { 
          bg: 'bg-gray-800', 
          text: 'text-white',
          border: 'border border-gray-900'
        };
      default: 
        return { 
          bg: 'bg-gray-100', 
          text: 'text-gray-800',
          border: 'border border-gray-300'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center ${config.bg} ${config.text} ${config.border} px-3 py-1 rounded-full text-xs font-medium capitalize`}>
      {status}
    </span>
  );
};

const TableLoading = ({ colSpan }) => (
  <tr>
    <td colSpan={colSpan} className="py-12">
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-900 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading user data...</p>
        <p className="text-sm text-gray-400 mt-1">Please wait a moment</p>
      </div>
    </td>
  </tr>
);

const TableEmpty = ({ colSpan }) => (
  <tr>
    <td colSpan={colSpan} className="py-12">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <FaUsers className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
        <p className="text-gray-600 max-w-sm mx-auto">
          There are currently no users in the system.
        </p>
      </div>
    </td>
  </tr>
);

export default AdminDashboard;