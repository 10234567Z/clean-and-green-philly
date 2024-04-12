"use client";

import React, { useState, FC } from "react";
import { Autocomplete, AutocompleteItem, Button, Select, SelectItem, Selection, Tooltip } from "@nextui-org/react";
import { useFilter } from "@/context/FilterContext";
import { Check, Info } from "@phosphor-icons/react";

type DimensionFilterProps = {
  property: string;
  display: string;
  options: string[];
  tooltip: string;
};

const DimensionFilter: FC<DimensionFilterProps> = ({
  property,
  display,
  options,
  tooltip,
}) => {
  const { dispatch, appFilter } = useFilter();
  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    appFilter[property]?.values || []
  );
  const [multiSelect, setMultiSelect] = useState<string[]>(
    appFilter[property]?.values || []
  )

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMultiSelect: string[] = e.target.value.split(",")
    setMultiSelect(newMultiSelect);
    dispatch({
      type: "SET_DIMENSIONS",
      property,
      dimensions: newMultiSelect,
    });
  }

  const toggleDimension = (dimension: string) => {
    const newSelectedKeys = selectedKeys.includes(dimension)
      ? selectedKeys.filter(key => key !== dimension)
      : [...selectedKeys, dimension];
    setSelectedKeys(newSelectedKeys);
    dispatch({
      type: "SET_DIMENSIONS",
      property,
      dimensions: newSelectedKeys,
    });
  };

  if(property === "neighborhood") {
    return (
      <div className="pb-6">
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <h2 className="heading-lg">{display}</h2>
            <Tooltip content={tooltip} placement="top" showArrow color="primary">
              <Info
                alt="More Info"
                className="h-5 w-9 text-gray-500 pl-2 pr-2 cursor-pointer"
                tabIndex={0}
              />
            </Tooltip>
          </div>
        </div>
        <div>
          <Select
            aria-label={display}
            selectionMode="multiple"
            placeholder="Select options"
            selectedKeys={multiSelect}
            className="space-x-2 min-h-[33.5px]"
            onChange={handleSelectionChange}
          >
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    )
  } 

  return (
    <div className="pb-6">
      <div className="flex items-center mb-2">
        <div className="flex items-center">
          <h2 className="heading-lg">{display}</h2>
          <Tooltip content={tooltip} placement="top" showArrow color="primary">
            <Info
              alt="More Info"
              className="h-5 w-9 text-gray-500 pl-2 pr-2 cursor-pointer"
              tabIndex={0}
            />
          </Tooltip>
        </div>
      </div>
      <div className="space-x-2 min-h-[33.5px]">
        {options.map((option, index) => (
          <Button
            key={index}
            disableAnimation
            onPress={() => toggleDimension(option)}
            size="sm"
            color={selectedKeys.includes(option) ? "success" : "default"}
            className={
              selectedKeys.includes(option) ? "tagSelected" : "tagDefault"
            }
            radius="full"
            aria-pressed={selectedKeys.includes(option)}
            startContent={
              selectedKeys.includes(option) ? (
                <Check className="w-3 w-3.5 max-h-6" />
              ) : undefined
            }
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DimensionFilter;
