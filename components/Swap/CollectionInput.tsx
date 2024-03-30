import { useBridgeProvider } from '@/providers/BridgeProvider';
import Input from '../Input';

const CollectionInput = () => {
  const { collectionAddress, setCollectionAddress } = useBridgeProvider() as any;

  const handleChange = (e: any) => {
    const newValue = e.target.value;
    setCollectionAddress(newValue);
  };

  return (
    <Input
      onChange={handleChange}
      value={collectionAddress}
      className="text-sm font-semibold w-[100%]"
      placeholder="sound collection"
    />
  );
};

export default CollectionInput;
