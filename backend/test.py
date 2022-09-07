



















#from collections import Counter
#def divideArray(nums) -> bool:
    # unique_nums = set(nums)
    # for num in unique_nums:
    #     count = nums.count(num)
    #     if count % 2 != 0:
    #         return False
    # return True


    # for value in Counter(nums).values():
    #     if value % 2 != 0 :
    #         return False
    # return True


    # return all(x % 2 == 0 for x in Counter(nums).values())

# print(divideArray(nums = [3,2,3,2,2,2])) #true
# print(divideArray(nums = [1,2,3,4])) #false



# def fullJustify(words, maxWidth: int):
#     new_str_list = []
#     current_line = ""
#     while len(words) != 0:
#         current_len = len(current_line)
#         word = words[0]
#         if current_len <= maxWidth and len(word)+1 + current_len <= maxWidth:
#             current_line += " " + words.pop(0)
#         else:
#             current_line = current_line.ljust(maxWidth)
#             new_str_list.append(current_line)
#             current_line = ""

#         if len(current_line) == maxWidth:
#             new_str_list.append(current_line)
#             current_line = ""

#     current_line = current_line.ljust(maxWidth)
#     new_str_list.append(current_line)

#     return new_str_list

# print(fullJustify(words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16))
# print(fullJustify(words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16))
# print(fullJustify(words = ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"], maxWidth = 20))

# def minNumberOperations(target) -> int:
#     new_array = [0] * len(target)
#     passes = 0
#     current_num = 0
#     while new_array != target:
#         passes += 1

#         print(new_array)
#         current_num += 1
#         for i in range(len(target)):
#             if target[i] == current_num:
#                 new_array[i] = current_num
#     print("\n")
#     print(passes)
#     return new_array

# print(minNumberOperations(target = [1,2,3,2,1])) #3
# print(minNumberOperations(target = [3,1,1,2]))   #4
# print(minNumberOperations([3,1,5,4,2]))          #7
