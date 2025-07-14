// components/TemplateChooserPopup.tsx
"use client";

import React, { useState } from 'react';
import { VIDEO_TEMPLATES, TRANSITION_EFFECTS, FPS_OPTIONS, FIT_MODES, VideoTemplate } from '@/utils/videoTemplates';

interface TemplateChooserProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (config: VideoConfig) => void;
}

export interface VideoConfig {
  template: VideoTemplate;
  width: number;
  height: number;
  fps: number;
  transitionEffect: string;
  transitionDuration: number;
  fitMode: string;
  enableTransitions: boolean;
  audioConfig?: 'background' | 'sequential' | 'simultaneous';
}

const TemplateChooserPopup: React.FC<TemplateChooserProps> = ({ isOpen, onClose, onSelect }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<VideoTemplate>(VIDEO_TEMPLATES[0]);
  const [customWidth, setCustomWidth] = useState(1920);
  const [customHeight, setCustomHeight] = useState(1080);
  const [fps, setFps] = useState(30);
  const [transitionEffect, setTransitionEffect] = useState('fade');
  const [transitionDuration, setTransitionDuration] = useState(1000);
  const [fitMode, setFitMode] = useState('cover');
  const [enableTransitions, setEnableTransitions] = useState(true);

  if (!isOpen) return null;

  const handleTemplateSelect = (template: VideoTemplate) => {
    setSelectedTemplate(template);
    if (template.id !== 'custom') {
      setCustomWidth(template.width);
      setCustomHeight(template.height);
      setFps(template.fps);
    }
  };

  const handleConfirm = () => {
    const config: VideoConfig = {
      template: selectedTemplate,
      width: selectedTemplate.id === 'custom' ? customWidth : selectedTemplate.width,
      height: selectedTemplate.id === 'custom' ? customHeight : selectedTemplate.height,
      fps,
      transitionEffect,
      transitionDuration,
      fitMode,
      enableTransitions
    };
    onSelect(config);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '900px',
        maxHeight: '90vh',
        width: '90%',
        overflow: 'auto',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Chọn mẫu video</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            ✕
          </button>
        </div>

        {/* Platform Templates */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '12px', fontSize: '18px' }}>Mẫu thiết kế </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '12px'
          }}>
            {VIDEO_TEMPLATES.map((template) => (
              <div
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                style={{
                  border: selectedTemplate.id === template.id ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '16px',
                  cursor: 'pointer',
                  backgroundColor: selectedTemplate.id === template.id ? '#eff6ff' : 'white',
                  position: 'relative'
                }}
              >
                {template.recommended && (
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '8px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: 'bold'
                  }}>
                    ĐỀ XUẤT
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '24px', marginRight: '8px' }}>{template.icon}</span>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{template.name}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{template.platform}</div>
                  </div>
                </div>
                <div style={{ fontSize: '14px', color: '#374151', marginBottom: '8px' }}>
                  {template.description}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  {template.width}×{template.height} ({template.aspectRatio}) • {template.fps} FPS
                  {template.maxDuration && ` • Max ${template.maxDuration}s`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Dimensions */}
        {selectedTemplate.id === 'custom' && (
          <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '12px' }}>Kích thước tùy chỉnh</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Chiều rộng (px)</label>
                <input
                  type="number"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Chiều cao (px)</label>
                <input
                  type="number"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Advanced Settings */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          {/* Frame Rate */}
          <div>
            <h4 style={{ marginBottom: '12px' }}>Tốc độ khung hình</h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {FPS_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFps(option.value)}
                  style={{
                    padding: '8px 16px',
                    border: fps === option.value ? '2px solid #3b82f6' : '1px solid #d1d5db',
                    borderRadius: '6px',
                    backgroundColor: fps === option.value ? '#eff6ff' : 'white',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>{option.label}</div>
                  <div style={{ fontSize: '10px', color: '#6b7280' }}>{option.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Image Fit Mode */}
          <div>
            <h4 style={{ marginBottom: '12px' }}>Chế độ vừa vặn hình ảnh</h4>
            <select
              value={fitMode}
              onChange={(e) => setFitMode(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                backgroundColor: 'white'
              }}
            >
              {FIT_MODES.map((mode) => (
                <option key={mode.value} value={mode.value}>
                  {mode.label} - {mode.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Transitions */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <input
              type="checkbox"
              id="enableTransitions"
              checked={enableTransitions}
              onChange={(e) => setEnableTransitions(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            <label htmlFor="enableTransitions" style={{ fontWeight: '500' }}>Bật hiệu ứng chuyển cảnh</label>
          </div>

          {enableTransitions && (
            <div style={{ paddingLeft: '24px' }}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Hiệu ứng chuyển cảnh</label>
                <select
                  value={transitionEffect}
                  onChange={(e) => setTransitionEffect(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    backgroundColor: 'white'
                  }}
                >
                  {TRANSITION_EFFECTS.map((effect) => (
                    <option key={effect.id} value={effect.id}>
                      {effect.name} - {effect.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                  Thời gian: {transitionDuration}ms
                </label>
                <input
                  type="range"
                  min="500"
                  max="3000"
                  step="100"
                  value={transitionDuration}
                  onChange={(e) => setTransitionDuration(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Preview */}
        <div style={{
          backgroundColor: '#f3f4f6',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '24px'
        }}>
          <h4 style={{ marginBottom: '8px' }}>Xem trước cài đặt</h4>
          <div style={{ fontSize: '14px', color: '#374151' }}>
            <strong>{selectedTemplate.name}</strong> • {
              selectedTemplate.id === 'custom' ? customWidth : selectedTemplate.width
            }×{
              selectedTemplate.id === 'custom' ? customHeight : selectedTemplate.height
            } • {fps} FPS • {fitMode} fit • {enableTransitions ? transitionEffect : 'No'} transitions
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 24px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            style={{
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: '#3b82f6',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Tạo video
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateChooserPopup;