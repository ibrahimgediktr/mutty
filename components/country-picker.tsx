import {useState, forwardRef, ReactEventHandler} from 'react';
import {createStyles, Menu, Image, Group, Text, Avatar, Select} from '@mantine/core';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    image?: string;
    label: string;
}

// eslint-disable-next-line react/display-name
export const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({image, label, ...others}: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                {image && <Avatar src={image}/>}

                <div>
                    <Text size="sm">{label}</Text>
                </div>
            </Group>
        </div>
    )
);

interface LanguagePickerProps {
    data: { label: string, image?: string, value: string }[],
    onSelect: any;
}


export function CountryPicker({
                                   data,
                                   onSelect
                               }: LanguagePickerProps) {
    return (
        <Select
            label="Countries"
            placeholder="Pick one..."
            itemComponent={SelectItem}
            data={data}
            onChange={onSelect}
            searchable
            nothingFound="Empty"
            filter={(value, item: { label: string; value: string; image: string; }) =>
                item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.value.toLowerCase().includes(value.toLowerCase().trim())
            }
        />
    );
}