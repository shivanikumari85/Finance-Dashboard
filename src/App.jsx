import Layout from './components/layout/Layout';
import DashboardPage from './components/dashboard/DashboardPage';
import TransactionsPage from './components/transactions/TransactionsPage';
import InsightsPage from './components/insights/InsightsPage';
import useStore from './store/useStore';

const PAGES = {
  dashboard: DashboardPage,
  transactions: TransactionsPage,
  insights: InsightsPage,
};

export default function App() {
  const activePage = useStore((s) => s.activePage);
  const Page = PAGES[activePage] || DashboardPage;

  return (
    <Layout>
      <Page key={activePage} />
    </Layout>
  );
}
