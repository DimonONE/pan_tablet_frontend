import './DynamicMediaElement.scss';
import { FC } from 'react';
import { renderVideoType } from '../../shared/features/checkVideoType';

export const DynamicMediaElement: FC<{ links: string[] }> = ({
    links
}) => {

    if (!links) {
        return <></>;
    }

    return renderVideoType(links);
};