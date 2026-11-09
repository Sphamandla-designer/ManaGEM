const { useState, useEffect } = React;

const PUBLIC_ROUTES = ['login', 'signup'];
const readRoute = () => window.location.hash.replace('#', '') || (getSession() ? 'dashboard' : 'login');

function App() {
  const [route, setRoute] = useState(readRoute);
  const navigate = (id) => {
    setRoute(id);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  useEffect(() => {
    const onHash = () => setRoute(readRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  useEffect(() => {
    if (!PUBLIC_ROUTES.includes(route)) document.title = 'ManaGEM';
  }, [route]);

  // "Open the demo" links from the website land here and go straight in.
  if (route === 'demo') {
    setSession({ ...MG_DEMO, signedInAt: Date.now() });
    window.location.replace('#dashboard');
    return null;
  }
  if (PUBLIC_ROUTES.includes(route)) {
    return <Auth mode={route} onDone={() => navigate('dashboard')}/>;
  }
  // Any app page needs a session; without one, sign in first.
  if (!getSession()) {
    window.location.replace('#login');
    return null;
  }
  const signOut = () => { clearSession(); navigate('login'); };

  let page;
  switch (route) {
    case 'dashboard': page = <Dashboard onNavigate={navigate}/>; break;
    case 'customers': page = <Customers onNavigate={navigate}/>; break;
    case 'enquiries': page = <Enquiries onNavigate={navigate}/>; break;
    case 'enquiry-detail': page = <EnquiryDetail onNavigate={navigate}/>; break;
    case 'products': page = <Products tab="list" onNavigate={navigate}/>; break;
    case 'product-variations': page = <Products tab="variations" onNavigate={navigate}/>; break;
    case 'product-components': page = <Products tab="components" onNavigate={navigate}/>; break;
    case 'product-kits': page = <Products tab="kits" onNavigate={navigate}/>; break;
    case 'product-price-changes': page = <Products tab="price-changes" onNavigate={navigate}/>; break;
    case 'product-sync': page = <Products tab="sync" onNavigate={navigate}/>; break;
    case 'product-new': page = <ProductForm mode="new" onNavigate={navigate}/>; break;
    case 'product-edit': page = <ProductForm mode="edit" onNavigate={navigate}/>; break;
    case 'variation-new': page = <VariationForm mode="new" onNavigate={navigate}/>; break;
    case 'variation-edit': page = <VariationForm mode="edit" onNavigate={navigate}/>; break;
    case 'component-new': page = <ComponentForm mode="new" onNavigate={navigate}/>; break;
    case 'component-edit': page = <ComponentForm mode="edit" onNavigate={navigate}/>; break;
    case 'kit-new': page = <KitForm mode="new" onNavigate={navigate}/>; break;
    case 'kit-edit': page = <KitForm mode="edit" onNavigate={navigate}/>; break;
    case 'price-change-new': page = <PriceChangeForm onNavigate={navigate}/>; break;
    case 'sync-edit': page = <SyncEditForm onNavigate={navigate}/>; break;
    case 'stock': page = <StockControl tab="dashboard" onNavigate={navigate}/>; break;
    case 'stock-suppliers': page = <StockControl tab="suppliers" onNavigate={navigate}/>; break;
    case 'stock-pos': page = <StockControl tab="pos" onNavigate={navigate}/>; break;
    case 'stock-warehouses': page = <StockControl tab="warehouses" onNavigate={navigate}/>; break;
    case 'stock-bays': page = <StockControl tab="bays" onNavigate={navigate}/>; break;
    case 'stock-movements': page = <StockControl tab="movements" onNavigate={navigate}/>; break;
    case 'stock-receive': page = <StockControl tab="receive" onNavigate={navigate}/>; break;
    case 'stock-transfer': page = <StockControl tab="transfer" onNavigate={navigate}/>; break;
    case 'stock-dispatch': page = <StockControl tab="dispatch" onNavigate={navigate}/>; break;
    case 'stock-sell': page = <StockControl tab="sell" onNavigate={navigate}/>; break;
    case 'stock-returns': page = <StockControl tab="returns" onNavigate={navigate}/>; break;
    case 'stock-take': page = <StockControl tab="stocktake" onNavigate={navigate}/>; break;
    case 'staff': page = <StaffRecords tab="members" onNavigate={navigate}/>; break;
    case 'staff-files': page = <StaffRecords tab="files" onNavigate={navigate}/>; break;
    case 'staff-rates': page = <StaffRecords tab="rates" onNavigate={navigate}/>; break;
    case 'staff-inactive': page = <StaffRecords tab="inactive" onNavigate={navigate}/>; break;
    case 'staff-master': page = <StaffRecords tab="master" onNavigate={navigate}/>; break;
    case 'staff-new': page = <StaffMemberForm mode="new" onNavigate={navigate}/>; break;
    case 'staff-edit': page = <StaffMemberForm mode="edit" onNavigate={navigate}/>; break;
    case 'staff-file-new': page = <StaffFileForm onNavigate={navigate}/>; break;
    case 'staff-rate-new': page = <StaffRateForm mode="new" onNavigate={navigate}/>; break;
    case 'staff-rate-edit': page = <StaffRateForm mode="edit" onNavigate={navigate}/>; break;
    case 'supplier-edit': page = <SupplierForm mode="edit" onNavigate={navigate}/>; break;
    case 'po-new': page = <POForm mode="new" onNavigate={navigate}/>; break;
    case 'po-edit': page = <POForm mode="edit" onNavigate={navigate}/>; break;
    case 'warehouse-new': page = <WarehouseForm mode="new" onNavigate={navigate}/>; break;
    case 'warehouse-edit': page = <WarehouseForm mode="edit" onNavigate={navigate}/>; break;
    case 'bay-new': page = <BayForm mode="new" onNavigate={navigate}/>; break;
    case 'bay-edit': page = <BayForm mode="edit" onNavigate={navigate}/>; break;
    case 'projects': page = <ProjectsModule tab="current" onNavigate={navigate}/>; break;
    case 'projects-current': page = <ProjectsModule tab="current" onNavigate={navigate}/>; break;
    case 'projects-pending': page = <ProjectsModule tab="pending" onNavigate={navigate}/>; break;
    case 'projects-closed': page = <ProjectsModule tab="closed" onNavigate={navigate}/>; break;
    case 'projects-deleted': page = <ProjectsModule tab="deleted" onNavigate={navigate}/>; break;
    case 'projects-reports': page = <ProjectsModule tab="reports" onNavigate={navigate}/>; break;
    case 'bookings': page = <ProjectsModule tab="bookings" onNavigate={navigate}/>; break;
    case 'bookings-reports': page = <ProjectsModule tab="booking-reports" onNavigate={navigate}/>; break;
    case 'bookings-calendar': page = <ProjectsModule tab="calendar" onNavigate={navigate}/>; break;
    case 'bookings-sage': page = <ProjectsModule tab="sage-imports" onNavigate={navigate}/>; break;
    case 'bookings-settings': page = <ProjectsModule tab="sage-settings" onNavigate={navigate}/>; break;
    case 'job-new': page = <JobForm mode="new" onNavigate={navigate}/>; break;
    case 'job-edit': page = <JobForm mode="edit" onNavigate={navigate}/>; break;
    case 'booking-new': page = <BookingForm mode="new" onNavigate={navigate}/>; break;
    case 'booking-edit': page = <BookingForm mode="edit" onNavigate={navigate}/>; break;
    case 'factory': page = <Factory/>; break;
    case 'reports': page = <Reports onNavigate={navigate}/>; break;
    case 'sales-master-data': page = <SalesMasterData onNavigate={navigate}/>; break;
    case 'debtors': page = <Debtors tab="debtors" onNavigate={navigate}/>; break;
    case 'debtors-receipts': page = <Debtors tab="receipts" onNavigate={navigate}/>; break;
    case 'debtors-statements': page = <Debtors tab="statements" onNavigate={navigate}/>; break;
    case 'debtor-new': page = <DebtorInteractionForm onNavigate={navigate}/>; break;
    case 'receipt-new': page = <ReceiptForm mode="new" onNavigate={navigate}/>; break;
    case 'receipt-edit': page = <ReceiptForm mode="edit" onNavigate={navigate}/>; break;
    case 'statement-new': page = <StatementForm mode="new" onNavigate={navigate}/>; break;
    case 'statement-edit': page = <StatementForm mode="edit" onNavigate={navigate}/>; break;
    case 'master-data': page = <MasterData/>; break;
    case 'users': page = <Users/>; break;
    case 'customer-detail': page = <Placeholder title="Customer Detail" sub="Single customer record view"/>; break;
    case 'contacts': page = <CustomerContacts onNavigate={navigate}/>; break;
    case 'warranties': page = <Warranties/>; break;
    case 'new-enquiry': page = <NewEnquiry onNavigate={navigate}/>; break;
    case 'closed': page = <ClosedEnquiries onNavigate={navigate}/>; break;
    case 'invoices': page = <Invoices/>; break;
    case 'sage': page = <SageInvoices/>; break;
    case 'inspections': page = <InspectionReports onNavigate={navigate}/>; break;
    case 'inspection-new': page = <InspectionReportForm mode="new" onNavigate={navigate}/>; break;
    case 'inspection-edit': page = <InspectionReportForm mode="edit" onNavigate={navigate}/>; break;
    case 'inspection-view': page = <InspectionReportForm mode="view" onNavigate={navigate}/>; break;
    case 'targets': page = <SalesTargets onNavigate={navigate}/>; break;
    case 'target-new': page = <SalesTargetForm mode="new" onNavigate={navigate}/>; break;
    case 'target-edit': page = <SalesTargetForm mode="edit" onNavigate={navigate}/>; break;
    case 'templates': page = <QuoteTemplatesHost tab="templates" onNavigate={navigate}/>; break;
    case 'template-items': page = <QuoteTemplatesHost tab="items" onNavigate={navigate}/>; break;
    case 'template-logos': page = <QuoteTemplatesHost tab="logos" onNavigate={navigate}/>; break;
    case 'template-new': page = <QuoteTemplateForm mode="new" onNavigate={navigate}/>; break;
    case 'template-edit': page = <QuoteTemplateForm mode="edit" onNavigate={navigate}/>; break;
    case 'item-new': page = <QuoteItemForm mode="new" onNavigate={navigate}/>; break;
    case 'item-edit': page = <QuoteItemForm mode="edit" onNavigate={navigate}/>; break;
    case 'logo-new': page = <QuoteLogoForm mode="new" onNavigate={navigate}/>; break;
    case 'logo-edit': page = <QuoteLogoForm mode="edit" onNavigate={navigate}/>; break;
    default: {
      // Dynamic routes — report category create, master data create/edit
      if (route.startsWith('report-create-')) {
        const cat = route.replace('report-create-', '');
        page = <ReportCreateForm catId={cat} onNavigate={navigate}/>;
        break;
      }
      if (route.startsWith('sales-master-new-')) {
        const cat = route.replace('sales-master-new-', '');
        page = <MasterDataForm catId={cat} mode="new" onNavigate={navigate}/>;
        break;
      }
      if (route.startsWith('sales-master-edit-')) {
        const cat = route.replace('sales-master-edit-', '');
        page = <MasterDataForm catId={cat} mode="edit" onNavigate={navigate}/>;
        break;
      }
      const labels = {
        'inspections':'Inspection Reports','targets':'Sales Targets','templates':'Quote Templates',
        'companies':'My Companies',
        'settings':'Settings'
      };
      page = <Placeholder title={labels[route] || route} sub="Module follows established patterns"/>;
    }
  }
  return <Shell active={route} onNavigate={navigate} onSignOut={signOut}>{page}</Shell>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
