import ResourceItem from "./ResourceItem";
import ResourceSetting from "./ResourceSetting";
import { GeneratedResource } from "@/types/resource";

interface ResourceSectionProps {
  resources: GeneratedResource[];
  onGenerateResources: (scriptStyle: string, imageStyle: string, voiceStyle: string) => Promise<void>;
  onDeleteResource: (resourceId: string) => void;
  onUpdateResource?: (resourceId: string, updates: Partial<GeneratedResource>) => void;
  isGenerating: boolean;
  context?: string;
}

export default function ResourceSection({ 
  resources, 
  onGenerateResources, 
  onDeleteResource, 
  onUpdateResource,
  isGenerating,
  context 
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

  return (
    <div className="flex gap-6">
      {/* ResourceSetting on the left */}
      <div className="w-80 flex-shrink-0">
        <ResourceSetting onGenerateResources={onGenerateResources} isGenerating={isGenerating} />
      </div>
      
      {/* Resource items on the right */}
      <div className="flex-1">
        <div className="flex items-center justify-between pb-2.5">
          <h2 className="text-xl font-semibold">
            Tài nguyên
            {resources.length > 0 && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({resources.length} mục)
              </span>
            )}
          </h2>
          {isGenerating && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang tạo tài nguyên...
            </div>
          )}
        </div>

        <div
          style={{
            maxHeight: "calc(100vh - 200px)", 
            overflowY: "auto", 
            marginBottom: "1rem",
          }}
        >
          <div className="space-y-5 lg:pr-4 lg:pb-4">
            {resources.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="mb-4">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <p className="text-lg font-medium">Chưa có tài nguyên nào</p>
                <p className="text-sm mt-1">Nhập nội dung và nhấn &quot;Tạo tài nguyên&quot; để bắt đầu</p>
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
                  onDelete={onDeleteResource}
                  onImageUpdate={handleImageUpdate}
                  onAudioUpdate={handleAudioUpdate}
                  context={context}
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
