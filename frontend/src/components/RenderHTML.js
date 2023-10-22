import DOMPurify from 'dompurify';

export const RenderHTML = ({stringHTML})=> {
    let clean = DOMPurify.sanitize(stringHTML, {USE_PROFILES: {html: true}});

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: clean }} />
        </div>
    )
}