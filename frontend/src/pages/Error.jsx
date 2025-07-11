import { Card } from '../components/Card';

export function Error() {
  return (
    <>
      <div className=' bg-blue-700 h-screen'>
          <div className='flex justify-center p-32'>
          <Card>Page not found :(</Card>
          </div>
      </div>
    </>
  );
}
