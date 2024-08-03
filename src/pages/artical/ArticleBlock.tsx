import { useState } from 'react';
import { Typography, Button } from '@mui/material';
import { AddAPhoto } from '@mui/icons-material';
import './ArticleBlock.css';

interface ArticleBlockProps {
  index: number;
}

const ArticleBlock: React.FC<ArticleBlockProps> = ({ index }) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPdfFile(event.target.files[0]);
    }
  };

  return (
    <div className="article-block" >
      {!pdfFile && (
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h6">Article {index + 1}</Typography>
          <input
            accept="application/pdf"
            style={{ display: 'none' }}
            id={`upload-button-${index}`}
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor={`upload-button-${index}`}>
            <Button variant="contained" component="span" startIcon={<AddAPhoto />}>
              Upload PDF
            </Button>
          </label>
        </div>
      )}
      {pdfFile && (
        <iframe
          src={URL.createObjectURL(pdfFile)}
          title={`pdf-${index}`}
        />
      )}
    </div>
  );
};

export default ArticleBlock;
