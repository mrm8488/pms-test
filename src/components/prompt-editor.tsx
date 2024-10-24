import React, { useState } from 'react';
import { Button } from './ui/button';
import { store } from '@/lib/store';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';

export function PromptEditor() {
  const [promptId, setPromptId] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleCommit = () => {
    if (!promptId || !content || !message) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive"
      });
      return;
    }

    store.commit(promptId, content, message);
    toast({
      title: "Success",
      description: "Prompt committed successfully"
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Input
          placeholder="Prompt ID"
          value={promptId}
          onChange={(e) => setPromptId(e.target.value)}
        />
      </div>
      <div>
        <Textarea
          placeholder="Enter your prompt content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[200px]"
        />
      </div>
      <div>
        <Input
          placeholder="Commit message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <Button onClick={handleCommit}>Commit Changes</Button>
    </div>
  );
}