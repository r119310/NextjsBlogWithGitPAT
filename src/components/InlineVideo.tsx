import { list } from '@vercel/blob';
import { Suspense } from 'react';

export default async function InlineVideo({ fileName }: { fileName: string }) {
  try {
    const { blobs } = await list({
      prefix: fileName,
      limit: 1,
    });
    const { url } = blobs[0];

    return (
      <Suspense>
        <video autoPlay muted loop disableRemotePlayback disablePictureInPicture preload='none' playsInline>
          <source src={url} type='video/mp4' />
        </video>
      </Suspense>
    );
  } catch {
    return <></>;
  }
}
