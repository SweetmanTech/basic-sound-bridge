import { TITLE } from '@/lib/consts';
import SwapHeader from '../Swap/SwapHeader';

const LandingPageHeader = () => (
  <div
    style={{ display: 'flex' }}
    className="space-y-3 flex flex-col"
    tw="flex flex-col items-center text-center w-[1000px]"
  >
    <p
      className="text-4xl font-bold tracking-tighter sm:text-5xl"
      tw="text-7xl font-black pt-[100px]"
    >
      {TITLE}.
    </p>
    <p
      className="max-w-[600px] text-md md:text-xl font-bold"
      tw="max-w-[600px] text-4xl font-bold mt-[-25]"
    >
      instantly collect music from any chain
    </p>
    <SwapHeader />
  </div>
);

export default LandingPageHeader;
