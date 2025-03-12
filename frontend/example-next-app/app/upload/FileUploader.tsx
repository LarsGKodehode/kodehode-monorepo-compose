'use client'

export function FileUploader() {
  return (
    <form>
      <div>
        <label htmlFor="file">Upload File</label>
        <input type="file" name="file" id="file" />
      </div>

      <div>
        <button type="submit">Upload</button>
        <button type="reset">Reset</button>
      </div>
    </form>
  );
}
