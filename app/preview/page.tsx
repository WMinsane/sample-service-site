'use client'
import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Preview = () => {
  const router = useRouter();
  const searchParams = new URLSearchParams(document.location.search);
  const [topic, setTopic] = useState<any>();

  useEffect(() => {
    const token = searchParams.get("preview_token");

    if (!token) {
      return;
    }

    fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        '/rcms-api/1/content/preview?preview_token=' +
        token,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.errors.length) {
          return;
        }
        setTopic(data.details);
      });
  }, [router]);

  if (!topic) {
    return null;
  }

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          background: '#333',
          color: 'white',
          p: 2,
          borderRadius: '8px',
        }}
      >
        プレビュー
      </Box>
      <Typography variant="h5" component="h1">
        {topic.subject}
      </Typography>
      <Typography
        dangerouslySetInnerHTML={{
          __html: topic.contents,
        }}
      />
    </Stack>
  );
};

export default Preview;