import CustomTag from '../components/custom-tag';
import { createRenderAst } from './utils';

export const renderAst = createRenderAst({
    components: {
        'custom-tag': CustomTag
    }
});
