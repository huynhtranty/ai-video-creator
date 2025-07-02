import React, { useEffect, useState } from 'react';
import Draggable from '@/components/shared/draggable';
import { Button, buttonVariants } from '@/components/ui/button';
import { DEFAULT_FONT } from '@/features/editor/constants/font';
import { cn } from '@/lib/utils';
import { dispatch } from '@designcombo/events';
import { ADD_TEXT } from '@designcombo/state';
import { generateId } from '@designcombo/timeline';
import { useIsDraggingOverTimeline } from '../hooks/is-dragging-over-timeline';

// SRT parser utility
function parseSRT(srt: string) {
  return srt
    .split('\n\n')
    .map(block => {
      const lines = block.trim().split('\n');
      if (lines.length >= 3) {
        const [, time, ...textLines] = lines;
        const [start, end] = time.split(' --> ');
        return {
          start: toMs(start),
          end: toMs(end),
          text: textLines.join(' '),
        };
      }
      return null;
    })
    .filter(Boolean) as { start: number; end: number; text: string }[];
}

function toMs(time: string) {
  const [h, m, s] = time.replace(',', ':').split(':').map(Number);
  return ((h * 3600 + m * 60 + s) * 1000) + Number(time.split(',')[1] || 0);
}

export const getAddTextPayload = (
  textProp: string,
  from: number,
  to: number
) => ({
  id: generateId(),
  display: {
    from,
    to,
  },
  type: 'text',
  details: {
    text: textProp,
    fontSize: 30,
    width: 1080,
    top: 900, // Position near the bottom for 1080p video
    fontUrl: DEFAULT_FONT.url,
    fontFamily: DEFAULT_FONT.postScriptName,
    color: '#ffffff',
    wordWrap: 'break-word',
    textAlign: 'center',
    borderWidth: 0,
    borderColor: '#000000',
    boxShadow: {
      color: '#ffffff',
      x: 0,
      y: 0,
      blur: 0,
    },
  },
});

export const Texts = ({ srt }: { srt: string }) => {
  const isDraggingOverTimeline = useIsDraggingOverTimeline();
  const [captionList, setCaptionList] = useState<{ text: string; start: number; end: number }[]>([]);

  // Parse SRT only when it changes
  useEffect(() => {
    if (srt) {
      setCaptionList(parseSRT(srt));
    }
  }, [srt]);

  // Add the first caption in the list to the timeline and remove it from the list
  const addSrtToTimeline = () => {
    if (captionList.length > 0) {
      const [first, ...rest] = captionList;
      dispatch(ADD_TEXT, {
        payload: getAddTextPayload(first.text, first.start, first.end),
        options: {},
      });
      setCaptionList(rest);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-12 flex-none items-center px-4 font-medium text-sm text-text-primary">
        Text
      </div>
      <div className="flex flex-col gap-2 px-4">
        <Draggable
          data={getAddTextPayload}
          renderCustomPreview={
            <Button variant="secondary" className="w-60">
              Add text
            </Button>
          }
          shouldDisplayPreview={!isDraggingOverTimeline}
        >
          <div className={cn(buttonVariants({ variant: 'secondary' }))}>
            Add text
          </div>
        </Draggable>
        {/* Button to add SRT captions */}
        <Button
          variant="outline"
          className="mt-2"
          onClick={addSrtToTimeline}
          disabled={captionList.length === 0}
        >
          Add SRT Caption
        </Button>
        {/* Show remaining captions */}
        <div className="mt-4">
          <div className="font-semibold mb-2">Captions to Add:</div>
          <ul className="text-xs space-y-1">
            {captionList.map((cap, idx) => (
              <li key={idx}>
                <span className="text-zinc-400">{cap.start} - {cap.end}:</span> {cap.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
