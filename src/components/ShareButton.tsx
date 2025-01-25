'use client';

import { useState } from 'react';
import { createShare } from '@/lib/prismashare';
import {  ShareIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

function ShareModal({ isOpen, onClose, link }: { isOpen: boolean, onClose: () => void, link: string }) {

  const accessLink = () => {
    window.open(link, '_blank');
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Lien de partage</DialogTitle>
        </DialogHeader>
        <input
          type="text"
          value={link}
          readOnly
          className="w-full p-2 border rounded mt-2"
        />
        <Button onClick={accessLink} className="mt-2">Accéder au lien</Button>
      </DialogContent>
    </Dialog>
  );
}


export default function ShareButton({
  userId,
  content
}: {
  userId: string,
  content: string
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const handleShare = async () => {
    try {
      const share = await createShare(userId, content);
      const fullShareLink = `${window.location.origin}/share/${share.id}`;
      setShareLink(fullShareLink);
      navigator.clipboard.writeText(fullShareLink);
      setIsOpen(true);
    } catch (error) {
      console.error('Share creation failed', error);
    }
  };

  return (
    <div>
      <Button
        onClick={handleShare}
        className="mb-3"
      >
        <ShareIcon />
      </Button>
      <ShareModal isOpen={isOpen} onClose={() => setIsOpen(false)} link={shareLink} />
    </div>
  );
}