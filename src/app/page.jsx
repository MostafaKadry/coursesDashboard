import Dashboard from './components/Dashboard';
export default function Home() {
  return (
    <div className="min-h-screen bg-[#1D1D1F] text-white p-8 bg-cover bg-center bg-no-repeat"  style={{ backgroundImage: 'url("/images/home-background.jpg")' }}>
      <h1 className="text-3xl font-bold mb-8 text-center">Training Management Dashboard</h1>
      <Dashboard />
    </div>
  );
}
console.log('Hello Mostafa');

