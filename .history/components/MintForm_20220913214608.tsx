import { useEffect } from 'react';
import {
  EControlStatus,
  IMAGE_TYPES,
  MbInput,
  MbAmountInput,
  MbMediaImport,
  MbText,
  MbTextArea,
  AUDIO_TYPES,
  MbNearAmountAccount,
} from 'mintbase-ui';
import { useFormContext } from 'react-hook-form';
import { EInputType } from '../types/types';

function MintForm() {
  const {
    register,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useFormContext();

  const uploadFile = (file: File) => {
    setValue(EInputType.MAIN_IMAGE, file);
    clearErrors(EInputType.MAIN_IMAGE);
  };

  const uploadSound = (file:File) => {
    setValue(EInputType.FOREVER_MEDIA, file);
    clearErrors(EInputType.MAIN_IMAGE);
  };

  const removeFile = () => {
    setValue(EInputType.MAIN_IMAGE, null);
    setError(
      EInputType.MAIN_IMAGE,
      {
        type: 'required',
        message: 'No image',
      },
      { shouldFocus: true },
    );
  };

  useEffect(() => {
    setError(
      EInputType.MAIN_IMAGE,
      {
        type: 'required',
        message: 'No image',
      },
      { shouldFocus: true },
    );
  }, [setError]);

  return (
    <>
      <div className="mb-4">
        <MbInput
          controlStatus={EControlStatus.NORMAL}
          label="Title"
          placeholder="Title"
          required
          {...register(EInputType.TITLE, {
            required: true,
            minLength: { value: 1, message: '' },
          })}
        />
      </div>
      <div className="mb-4">
        <MbTextArea
          controlStatus={EControlStatus.NORMAL}
          label="Description"
          placeholder="Token description"
          {...register(EInputType.DESCRIPTION, {
            required: true,
          })}
        />
      </div>
      <div className="mb-4">
        <MbText className="p-med-90 mb-4">Image</MbText>
        <MbMediaImport
          {...register(EInputType.MAIN_IMAGE, {
            required: true,
            validate: () => true,
          })}
          acceptedFormats={IMAGE_TYPES}
          handleFileAdd={uploadFile}
          handleFileRemove={removeFile}
          idealDimensions="1:1"
          maxFileSize={5}
          uploadedFile={watch(EInputType.MAIN_IMAGE)}
        />
      </div>
      <div className="mb-4">
        <MbText className="p-med-90 mb-4">Lossless Audio</MbText>
        <MbMediaImport
          {...register(EInputType.FOREVER_MEDIA, {
            required: true,
            validate: () => true,
          })}
          acceptedFormats={AUDIO_TYPES}
          handleFileAdd={uploadSound}
          handleFileRemove={removeFile}
          idealDimensions="1:1"
          maxFileSize={30}
          uploadedFile={watch(EInputType.FOREVER_MEDIA)}
        />
      </div>
      <div className="mb-4">
        <MbText className="p-med-90 mb-4">Amount of items to mint </MbText>
        <MbAmountInput
          maxAmount={50}
          onBlur={(e) => {
            e.preventDefault();
            setValue(EInputType.MINT_AMOUNT, e.target.value);
          }}
          onValueChange={(amount) => {
            setValue(EInputType.MINT_AMOUNT, amount);
          }}
        />
      </div>
      <div className="mb-4">
        <MbInput
          controlStatus={EControlStatus.NORMAL}
          label="ISRC"
          placeholder="ISRC"
          required
          {...register(EInputType.ISRC, {
            required: true,
            minLength: { value: 1, message: '' },
          })}
        />
      </div>
      <div className="mb-4">
        <MbInput
          controlStatus={EControlStatus.NORMAL}
          label="ISWC"
          placeholder="ISWC"
          required
          {...register(EInputType.ISWC, {
            required: true,
            minLength: { value: 1, message: '' },
          })}
        />
      </div>
      <div className="mb-4">
        <MbInput
          controlStatus={EControlStatus.NORMAL}
          label="Fingerprint (Chromaprint)"
          placeholder="Fingerprint"
          required
          {...register(EInputType.FINGERPRINT, {
            required: true,
            minLength: { value: 1, message: '' },
          })}
        />
      </div>
      <div className="mb-4">
        <MbNearAmountAccount
          accountExists={function noRefCheck(){}}
          defaultAccountsCounter={1}
          defaultState={{
            mintbase: {
              account: {
                valid: true,
                value: 'mintbase.near',
              },
              amount: {
                valid: true,
                value: 12,
              },
              cleared: false,
              editable: false,
            },
          }}
          initialUsedAmount={0}
          isPercentage
          saveButton={{
            save: console.log('Save'),
            text: 'Save'
          }}
          smallSubtitle="Select up to 25 accounts"
          subtitle="Split revenue clears after each sale. Needs at least two accounts. The minter will receive 100% of split revenue unless splits are added."
        />
      </div>


      
      {/* <div className="mb-4">
        <MbText className="p-med-90 mb-4">Category</MbText>
        <div className="flex pt-4 gap-4 overflow-scroll w-full no-scrollbar">
          {Object.keys(tags).map((tag) => (
            <MbChip
              key={`${tag}`}
              isChecked={watch(EInputType.CATEGORY) === tag}
              handleClick={() => handleSelectCategory(tag)}
              disabled={false}
              label={tags[tag as keyof typeof tags]}
              {...register('categories')}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <MbInputTags
          label="Tags"
          maxTags={4}
          placeholder="Add up to 4 tags to improve discoverability"
          onTagsChange={(tagGroup) => {
            setValue(EInputType.TAGS, tagGroup);
          }}
          onMaxTags={() => console.log('mx')}
        />
      </div> */}
    </>
  );
}

export default MintForm;
