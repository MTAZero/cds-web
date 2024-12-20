export const RouterLink = {
  LOGIN: "/login",
  HOME: "/home",
  CONTACT: "/contact",
  XAC_THUC_SSO: "/xac-thuc",

  // báo quân số
  TROOP: "troop",
  TROOP_REPORT: "/troop-report",
  PERSONAL_REPORT: "/personal-report",

  // Nghỉ phép
  LEAVE_MENU: "leave",
  LEAVE_APPROVE: "/leave-approve",
  LEAVE_REGISTER: "/leave-register",

  // Lịch trực
  GUARD_MENU: "guard-dutty",
  MANAGER_GUARD_SETTING: "/manager-guard-dutty-position",
  UPDATE_GUARD_DUTTY: "/update-guard-dutty",
  GUARD_DUTTY_UNIT: "/guard-dutty-unit",
  PERSONAL_GUARD_SCHEDULE: "/personal-guard-dutty",

  // lịch công tác
  WORK_CALENDAR: "work-calendar",
  UNIT_WORK_CALENDAR: "/work-calendar-unit",
  USER_WORK_CALENDAR: "/work-calendar-user",
  MANAGER_CALENDAR: "/work-calendar-manager",

  // Văn kiện
  VAN_KIEN_ROUTE: "/van-kien",

  // Tiến trình biểu
  TIEN_TRINH_BIEU_ROUTE: "/tien-trinh-bieu",
  TIEN_TRINH_BIEU_DETAIL_ROUTE: "/tien-trinh-bieu/:id",
  TIEN_TRINH_BIEU_CHECK_ROUTE: "/tien-trinh-bieu/thong-ke/:id",
  // Thống kê
  THONG_KE_HUAN_LUYEN_ROUTE: "/thong-ke-huan-luyen",

  // Rút kinh nghiệm
  RUT_KINH_NGHIEM_ROUTE: "/rut-kinh-nghiem",
  RUT_KINH_NGHIEM_DETAIL_ROUTE: "/rut-kinh-nghiem/:id",

  // Sổ giao ban
  SO_GIAO_BAN_ROUTE: "/so-giao-ban/:type",
  SO_GIAO_BAN_DETAIL_ROUTE: "/so-giao-ban/:type/:id",

  // Sổ theo dõi/thống kê
  SO_THEO_DOI_KY_LUAT: "/so-theo-doi-ky-luat",
  SO_THEO_DOI_DI_CONG_TAC: "/so-theo-doi-di-cong-tac",
  SO_THONG_KE_TAI_LIEU: "/so-thong-ke-tai-lieu",
  SO_THONG_KE_RA_VAO: "/so-thong-ke-ra-vao",
  SO_DIEN_DEN: "/so-dien-den",
  SO_DIEN_DI: "/so-dien-di",

  // Thống kê huấn luyện cá nhân
  THONG_KE_HUAN_LUYEN_CA_NHAN: "/thong-ke-huan-luyen-ca-nhan",
  SO_SACH_CA_NHAN_DETAIL_ROUTE: "/thong-ke-huan-luyen-ca-nhan/:id",

  // Quản trị xăng dầu,xe
  QUAN_LY_XE_ROUTE: "/quan-ly-xang-dau/xe",
  QUAN_LY_NHIEN_LIEU_ROUTE: "/quan-ly-xang-dau/nhien-lieu",
  QUAN_LY_NHIEM_VU_ROUTE: "/quan-ly-xang-dau/nhiem-vu",
  QUAN_LY_DAU_MOI_ROUTE: "/quan-ly-xang-dau/dau-moi",
  QUAN_LY_KE_HOACH_XE_ROUTE: "/quan-ly-xang-dau/ke-hoach-xe",
  QUAN_LY_KE_HOACH_XE_DETAIL_ROUTE: "/quan-ly-xang-dau/ke-hoach-xe/:id",

  QUAN_LY_TONG_HOP_XE_ROUTE: "/quan-ly-xang-dau/tong-hop-xe",
  QUAN_LY_TONG_HOP_XE_DETAIL_ROUTE: "/quan-ly-xang-dau/tong-hop-xe/:id",
  QUAN_LY_LENH_XE_ROUTE: "/quan-ly-xang-dau/lenh-xe",
  QUAN_LY_PHIEU_XUAT_XANG_ROUTE: "/quan-ly-xang-dau/phieu_xuat_xang",
  // Quản trị
  QUAN_TRI_NGUOI_DUNG_ROUTE: "/quan-tri/nguoi-dung",
  QUAN_TRI_PERMISSION_ROUTE: "/quan-tri/permission",
  QUAN_TRI_CHUC_DANH_ROUTE: "/quan-tri/chuc-danh",
  QUAN_TRI_ROLE_ROUTE: "/quan-tri/role",
  QUAN_TRI_DON_VI_ROUTE: "/quan-tri/don-vi",

  // Thống kê trang cổng
  THONG_KE_CTT: "/thong-ke-ctt",

  // Quản lý bếp
  NGUYEN_LIEU: "/material",
  THUC_DON: "/menu",
  
  // Công tác tham mưu huấn luyện
  TRAINING: "/training", // Công tác tham mưu huấn luyện
  PLAN: "/training/plan", // Kế hoạch, tiến trình biểu
  PLAN_YEAR: "/training/plan/year", // Kế hoạch huấn luyện năm
  PLAN_PHASE1: "/training/plan/phase1", // Kế hoạch huấn luyện giai đoạn 1
  PLAN_PHASE2: "/training/plan/phase2", // Kế hoạch huấn luyện giai đoạn 2
  PLAN_MONTH: "/training/plan/month", // Kế hoạch huấn luyện tháng
  PLAN_WEEK: "/training/plan/week", // Tiến trình biểu huấn luyện tuần
  
  ORDER: "/training/order", // Mệnh lệnh, hướng dẫn
  ORDER_YEAR: "/training/order/year", // Mệnh lệnh huấn luyện năm
  EXEC_YEAR: "/training/order/exec-year", // Hướng dẫn thực hiện kế hoạch năm
  EXEC_PHASE1: "/training/order/exec-phase1", // Hướng dẫn thực hiện kế hoạch giai đoạn 1
  EXEC_PHASE2: "/training/order/exec-phase2", // Hướng dẫn thực hiện kế hoạch giai đoạn 2
  
  STATS: "/training/stats", // Thống kê huấn luyện
  
  REPORTS: "/training/reports", // Báo cáo huấn luyện
  REPORT_WEEK: "/training/reports/week", // Báo cáo huấn luyện tuần
  REPORT_MONTH: "/training/reports/month", // Báo cáo huấn luyện tháng
  REPORT_QUARTER: "/training/reports/quarter", // Báo cáo huấn luyện quý
  REPORT_6MONTH: "/training/reports/6month", // Báo cáo huấn luyện 6 tháng
  REPORT_9MONTH: "/training/reports/9month", // Báo cáo huấn luyện 9 tháng
  REPORT_YEAR: "/training/reports/year", // Báo cáo huấn luyện năm
  
  DOCS: "/training/docs", // Giáo án, thông qua giáo án
  DOCS_APPROVE: "/training/docs/approve", // Thông qua giáo án
  DOCS_TRAIN: "/training/docs/train", // Giáo án huấn luyện
  
  PERSONAL_LOG: "/training/personal-log", // Sổ học tập cá nhân
};
