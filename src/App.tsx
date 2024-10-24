import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PromptEditor } from './components/prompt-editor';
import { PromptHistory } from './components/prompt-history';
import { store } from './lib/store';

function App() {
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const prompts = store.getAllPrompts();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Prompt Version Control</h1>
        
        <Tabs defaultValue="editor">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor">
            <PromptEditor />
          </TabsContent>
          
          <TabsContent value="history">
            <div className="space-y-4">
              <select 
                value={selectedPrompt}
                onChange={(e) => setSelectedPrompt(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select a prompt</option>
                {prompts.map(id => (
                  <option key={id} value={id}>{id}</option>
                ))}
              </select>
              
              {selectedPrompt && <PromptHistory promptId={selectedPrompt} />}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;