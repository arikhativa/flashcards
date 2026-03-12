import MainScreen from '@/components/MainScreen';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/text';
import { Link } from 'expo-router';

export default function TestFinishScreen() {
  return (
    <MainScreen className="items-center justify-center">
      <Link className="mb-40" href={'/test/summary'} asChild replace>
        <Button>
          <Typography variant={'large'}>Finish Test?</Typography>
        </Button>
      </Link>
    </MainScreen>
  );
}
