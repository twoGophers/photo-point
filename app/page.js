import dynamic from 'next/dynamic';

const Catalog = dynamic(() => import('@/components/catalog/Catalog'), {
  loading: () => (
    <div className='mt-8'>
      <h2 className='container text-3xl font-semibold antialiased text-center'>Loading...</h2>
    </div>
  ),
});

export default function Home() {
  return (
    <div className="container">
      <Catalog />
    </div>
  );
}
