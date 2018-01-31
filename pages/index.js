import React from 'react';

import Layout from '../components/Layout';
import {description, title} from '../utils/site';

const Page = () =>
    <Layout
        description={description}
        title={`${title} - ${description}`}
        keywords={'KEYS'}
    >
        <p>{'Content'}</p>
    </Layout>;

export default Page;
