import ResourceItem from "./ResourceItem";
import ResourceSetting from "./ResourceSetting";
import { GeneratedResource } from "@/types/resource";

interface ResourceSettings {
  script: {
    style: string;
    model: string;
  };
  audio: {
    gender: string;
    language: string;
    speedRate: number;
    model: string;
  };
  image: {
    style: string;
  };
}

interface ResourceSectionProps {
  resources: GeneratedResource[];
  onGenerateResources: (settings: ResourceSettings) => Promise<void>;
  onUpdateResource?: (resourceId: string, updates: Partial<GeneratedResource>) => void;
  isGenerating: boolean;
  context?: string;
  projectId?: string;
}

export default function ResourceSection({ 
  resources, 
  onGenerateResources, 
  onUpdateResource,
  isGenerating,
  context,
  projectId
}: ResourceSectionProps) {

  const handleImageUpdate = (resourceId: string, newImageSrc: string) => {
    if (onUpdateResource) {
      onUpdateResource(resourceId, { imageSrc: newImageSrc });
    }
  };

  const handleAudioUpdate = (resourceId: string, newAudioSrc: string) => {
    if (onUpdateResource) {
      onUpdateResource(resourceId, { audioSrc: newAudioSrc });
    }
  };

  const handleLoadingStateChange = (resourceId: string, updates: { isImageLoading?: boolean; isAudioLoading?: boolean }) => {
    if (onUpdateResource) {
      onUpdateResource(resourceId, updates);
    }
  };

  const handleScriptUpdate = (resourceId: string, newScript: string) => {
    if (onUpdateResource) {
      onUpdateResource(resourceId, { textContent: newScript });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* ResourceSetting on top */}
      <div className="flex-shrink-0 mb-8">
        <ResourceSetting onGenerateResources={onGenerateResources} isGenerating={isGenerating} />
      </div>
      
      {/* Resource items below */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between pb-6 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-800">
            Tài nguyên
            {resources.length > 0 && (
              <span className="text-base font-normal text-gray-500 ml-3">
                ({resources.length} mục)
              </span>
            )}
          </h2>
          {isGenerating && (
            <div className="flex items-center gap-3 text-sm text-gray-500 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
              <svg className="animate-spin h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="font-medium">Đang tạo tài nguyên...</span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 pb-4">
            {resources.length === 0 ? (
              <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <div className="mb-6">
                  <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Chưa có tài nguyên nào</h3>
                <p className="text-gray-500 max-w-md mx-auto">Nhập nội dung bên trái và nhấn &quot;Tạo tài nguyên&quot; để bắt đầu tạo video của bạn</p>
              </div>
            ) : (
              resources.map((resource) => (
                <ResourceItem
                  key={resource.id}
                  id={resource.id}
                  imageSrc={resource.imageSrc}
                  imageAlt={resource.imageAlt}
                  textContent={resource.textContent}
                  audioSrc={resource.audioSrc}
                  onImageUpdate={handleImageUpdate}
                  onAudioUpdate={handleAudioUpdate}
                  onScriptUpdate={handleScriptUpdate}
                  onLoadingStateChange={handleLoadingStateChange}
                  context={context}
                  projectId={projectId}
                  isImageLoading={resource.isImageLoading}
                  isImageError={resource.isImageError}
                  isAudioLoading={resource.isAudioLoading}
                  isAudioError={resource.isAudioError}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
