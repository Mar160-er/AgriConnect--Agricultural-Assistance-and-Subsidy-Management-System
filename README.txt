AgriConnect AASMS v2.0 — Agricultural Assistance & Subsidy Management System
Bongabong Municipal Agriculture Office (MAO)

FILES:
- index.html      Main application shell (sidebar, topbar, layout)
- css/style.css   Full design system: AgriConnect color palette, components, responsive layout
- js/app.js       All page logic, charts, forms, filtering, and data management

HOW TO RUN:
1. Extract the ZIP file.
2. Open the AgriConnect_AASMS folder.
3. Double-click index.html in any modern browser (Chrome, Edge, Firefox).
4. An internet connection is required on first load to fetch Google Fonts and Chart.js CDN.

FEATURES:
- Dashboard with interactive line chart, donut chart, and bar chart (Chart.js)
- 18 sample farmer records across Bongabong barangays
- Assistance Applications: full CRUD, multi-filter search (status, program, barangay)
- Beneficiary Verification: dedicated verification workflow
- Subsidy Distribution: distribution tracking with chart
- Programs & Reports: program cards, barangay chart, summary stats, CSV export
- Settings: office profile, data management, restore sample data
- New Application modal form with validation
- Quick status update from record detail view
- Application timeline showing status history
- CSV export with BOM for Excel compatibility
- Responsive layout (desktop, tablet, mobile)
- Records stored in browser localStorage

DESIGN:
- Color palette: Forest Green (#164A35), Emerald (#27845B), Harvest Gold (#E6B54B), Soft Mint, Ivory White
- Fonts: Poppins (headings) + Inter (body)
- Inspired by the AgriConnect ERP design specification

NOTES:
- Frontend prototype only — no server-side backend or authentication.
- For production: connect a secure database, add role-based access control, and implement audit logging.
