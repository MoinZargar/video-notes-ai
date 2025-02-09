import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function ChatWindow({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
     return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl h-[600px] p-0">
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-black text-white">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">Chat with Alice</span>
            </div>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-gray-700 rounded">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M14 10l7-7m-7 17H3V3h12" />
                </svg>
              </button>
              <button className="p-1 hover:bg-gray-700 rounded">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 6V18M6 12H18" />
                </svg>
              </button>
              <button className="p-1 hover:bg-gray-700 rounded" onClick={onClose}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-6 flex flex-col items-center justify-center space-y-6 bg-gray-50">
            <h2 className="text-2xl font-semibold text-center">Meet Alice,</h2>
            <h3 className="text-xl font-medium text-center">your AI Study Helper</h3>
            
            <div className="flex flex-col gap-6 w-full max-w-md">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                  ?
                </div>
                <p className="flex-1 text-gray-600">
                  Ask me any study question, anytime, and let's dive into it together.
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                  💬
                </div>
                <p className="flex-1 text-gray-600">
                  Or, click on a bubble icon to start a focused chat based on a specific note, summary, or exercise.
                </p>
              </div>
            </div>
          </div>

          {/* Input area */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Message Alice..."
                className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-black"
              />
              <Button 
                className="rounded-full px-4 bg-black text-white hover:bg-black/90"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

