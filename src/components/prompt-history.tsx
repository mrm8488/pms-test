import React, { useState, useEffect } from 'react';
import { store } from '@/lib/store';
import { Button } from './ui/button';
import { format } from 'date-fns';
import * as diff from 'diff';

export function PromptHistory({ promptId }: { promptId: string }) {
  const [history, setHistory] = useState(store.getHistory(promptId));

  useEffect(() => {
    setHistory(store.getHistory(promptId));
  }, [promptId]);

  const getDiff = (oldContent: string, newContent: string) => {
    const differences = diff.diffWords(oldContent, newContent);
    return differences.map((part, index) => (
      <span
        key={index}
        className={
          part.added ? 'bg-green-200' : part.removed ? 'bg-red-200' : ''
        }
      >
        {part.value}
      </span>
    ));
  };

  return (
    <div className="space-y-4">
      {history.map((version, index) => (
        <div key={version.version} className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Version {version.version}</h3>
            <span className="text-sm text-gray-500">
              {format(version.timestamp, 'PPpp')}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{version.message}</p>
          <div className="bg-gray-50 p-2 rounded">
            {index > 0 ? (
              getDiff(history[index - 1].content, version.content)
            ) : (
              <pre className="whitespace-pre-wrap">{version.content}</pre>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
