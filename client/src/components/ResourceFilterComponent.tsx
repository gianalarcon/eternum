import { useState } from "react";
import { FilterButton } from "../elements/FilterButton";
import { SecondaryPopup } from "../elements/SecondaryPopup";
import { resources } from "@bibliothecadao/eternum";
import { SelectBox } from "../elements/SelectBox";
import { ResourceIcon } from "../elements/ResourceIcon";
import Button from "../elements/Button";

type ResourceFilterProps = {
  children: React.ReactNode;
  selectedResources: number[];
  setSelectedResources: (resources: number[]) => void;
};

export const ResourceFilter = ({ selectedResources, setSelectedResources, children }: ResourceFilterProps) => {
  const [popupOpened, setPopupOpened] = useState<boolean>(false);

  const selectResource = (resource: number) => {
    if (selectedResources.includes(resource)) {
      setSelectedResources(selectedResources.filter((r) => r !== resource));
    } else {
      setSelectedResources([...selectedResources, resource]);
    }
  };

  return (
    <>
      <FilterButton active={popupOpened} onClick={() => setPopupOpened(!popupOpened)}>
        {children}
      </FilterButton>
      {popupOpened && (
        <SecondaryPopup>
          <SecondaryPopup.Head onClose={() => setPopupOpened(false)}>
            <div className="flex items-center space-x-1">
              <div className="mr-0.5">{children}</div>
              {selectedResources.map((selectedResource, index) => (
                <ResourceIcon
                  key={index}
                  size="xs"
                  resource={resources.find((resource) => resource.id === selectedResource)?.trait || ""}
                />
              ))}
              {selectedResources.length > 0 && (
                <Button onClick={() => setSelectedResources([])} variant="outline" size="xs">
                  Clear all
                </Button>
              )}
            </div>
          </SecondaryPopup.Head>
          <SecondaryPopup.Body>
            <div className="grid grid-cols-3 gap-1 p-2">
              {resources.map((resource, index) => (
                <SelectBox
                  key={index}
                  selected={selectedResources.includes(resource.id)}
                  onClick={() => selectResource(resource.id)}
                >
                  <div className="flex items-center">
                    <ResourceIcon containerClassName="mr-1" size="xs" resource={resource.trait} />
                    {resource.trait}
                  </div>
                </SelectBox>
              ))}
            </div>
            <div className="flex justify-end mb-2 mr-2">
              <Button onClick={() => setPopupOpened(false)} variant="primary">
                Close
              </Button>
            </div>
          </SecondaryPopup.Body>
        </SecondaryPopup>
      )}
    </>
  );
};
